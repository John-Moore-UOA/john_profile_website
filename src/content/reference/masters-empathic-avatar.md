---
project: "masters-empathic-avatar"
title: "System reference"
---

<!-- TODO: verify year (first commit in the Unity project is 2026-08-24; the Masters may have started earlier), role wording, and whether any of this has been published or presented. -->
<!-- TODO: add the final thesis title / research question to the title or summary once agreed. -->

## Overview

This is my Masters research project at the Empathic Computing Lab, University of Auckland. It is a Unity VR study environment in which a participant makes meals in a virtual apartment kitchen while an AI-driven embodied character coaches them. The character talks, listens, looks at things, points, and offers help at moments chosen by code, with a language model supplying the wording.

Around the character sits the machinery of a controlled study: four cooking trials, a training scene, three study conditions that change how the character is embodied, scripted interruptions, EEG and skin-conductance sensing over Lab Streaming Layer (LSL), event and signal logging, and an operator dashboard for the facilitator.

This page is organised by facet of the system rather than by date. It records what I designed and built. The research questions and results are not written up here yet.

![The apartment kitchen the participant works in, seen in the Unity scene.](/images/masters/kitchen.png "The kitchen the participant and the character share")

## Why

<!-- TODO: John to write. The motivation and research question (e.g. why an empathic/embodied character for guided task support, why physiological sensing, why cooking, the rehabilitation angle mentioned in the design notes). Keep it to a short paragraph. -->

## System architecture

The whole thing runs on a study PC with a Quest headset. Unity is the hub. It talks to a handful of small local services, so that the heavy or fragile parts (speech, language models, signal processing) can be swapped or restarted without touching the VR scene.

- **Unity 6 (6000.3) client** on URP, using XR Interaction Toolkit 3.4.1, OpenXR and Meta OpenXR, Animation Rigging 1.4.1, XR Hands (package and samples are in the project), and the LSL4Unity package. First-party code lives under `Assets/EVC` (the character), `Assets/Room` (the kitchen, the trial machinery and the study scripts), `Assets/Avatar` (the character and body rigs), `Assets/Physiological`, `Assets/Training` and `Assets/Distractors`.
- **Speech sidecar** (`Tools/evc_chatterbox`, with `Tools/evc_speech` as a Piper fallback). A Python process that owns the microphone, runs voice-activity detection and speech-to-text, and synthesises the character's voice. Unity connects to it over a local WebSocket.
- **Fast language model** served by Ollama, streaming a short spoken reply.
- **Slow language model**, switchable between a local 2B model served by vLLM in Docker and a cloud Gemini model on Vertex AI.
- **Sensing**: an EEG headset and a Shimmer GSR/PPG unit published on LSL, with a planned cognitive-load model service that reads the raw streams and publishes a prediction stream back.
- **Operator side**: a separate V-CORE dashboard (see [the real-time study dashboard](/projects/realtime-study-dashboard)) that receives the trial context and a live view of the participant's headset, and can send assist and AI-switch commands back.

![The whole system on one study PC plus a Quest 3: Unity at the centre, with a speech sidecar, Ollama, a switchable slow LLM, an operator dashboard, LSL physiology streams with a cognitive-load model service, and facial mocap over UDP.](/images/diagrams/masters-system.svg "System architecture: Unity at the centre, local services around it")
### Design rules that shape everything else

These rules come from my research-plan notes and are enforced in code, not just in prompts:

1. **Code decides, the model phrases.** Whether the character speaks, which help strategy runs, and whether the participant's action was right are all decided by deterministic C#. The language model only chooses wording, or answers a free question.
2. **Every feature has an off switch.** Behaviours are separate components. Disable one and it drops out, so each study condition is a set of switches.
3. **Log first, act second.** New appraisals can run in a shadow mode that only writes to the log.
4. **The same brain in every body.** The decision logic is identical across the three body conditions, so the embodiment comparison is not confounded.
5. **Nothing physiological is ever spoken to the participant.** Sensor-derived state may change timing or delivery style, but the character never says "you seem stressed".

## Avatar design

There are three people-shaped things in the scene, all built on Character Creator (CC) characters exported through the Reallusion CCiC Unity Tools pipeline.

- **The Empathic Virtual Character (EVC)**: the AI character the participant talks to.
- **The Facilitator Virtual Character**: a second character that stands in for the human facilitator and whose face can be driven live by webcam capture.
- **The participant's own avatar**: a full body driven from the headset and controllers, visible in a mirror and when the participant looks down.

### Character Creator pipeline

- Characters are authored in Character Creator and exported to Unity through the CCiC Unity Tools package (v2.2.6), with the rig set to Humanoid. The EVC export is under `Assets/Reallusion/EVC`, the facilitator under `Assets/Reallusion/new_facilitator`, and the original base character under `DataLink_Imports`.
- The base character carries the **CC4 Extended expression profile: 176 blendshapes** and the CC viseme set. It has no ARKit blendshapes, so I generated a mapping table from the 52 ARKit shapes to the CC4 Extended targets (`ARKitCCMapping.cs`) and checked that every one resolves.
- Characters are exported in high quality for the PC build and baked to **lower-resolution versions** for performance (`low_res_bakedin_Facilitator`, the "lower res avatars" and "new avatar skins" commits).
- The DataLink animation exports arrive as Generic clips on a full character shell, which will not retarget. I wrote editor tools (`Tools > Avatar`) that re-import them as Humanoid against the character's avatar, rename the clip, bake root motion and extract standalone clips.
- The participant avatar has a **head swapper** (`change_head.cs`) that swaps face, skin, hair, brows, eyes, teeth and tongue to a donor character while keeping the main skeleton and clothes. `GameStateController` exposes a male/female switch so the participant sees a head that matches them.

<!-- TODO: verify the avatar art direction: who designed the faces and skins in CC (me, or a stock CC model), the character's name/persona as shown to participants, and the age/gender presentation chosen and why. -->

![Diagram of the three characters side by side: the AI-driven Empathic Virtual Character, the Facilitator Virtual Character whose face is performed through webcam mocap, and the participant's own avatar with a swappable head.](/images/diagrams/masters-three-characters.svg "The three characters: EVC, facilitator and participant avatar (diagram)")

![The EVC character close up in the Unity scene.](/images/masters/evc-avatar.png "The EVC character as it appears in Unity")

![Diagram of the EVC prefab: the hierarchy holds the Character Creator skeleton and meshes, and the component stack is AvatarDirector, AvatarClipPlayer, EvcBrain, EvcGaze, EvcGesture and EvcLipSync.](/images/diagrams/masters-evc-prefab.svg "The EVC prefab and its component stack in Unity (diagram)")

### Participant body (player avatar)

The participant sees a body that moves with them. `PlayerBodySolver` (with `ArmSolver`, `FootPlanter`, `FingerCurl`, `AvatarSkeleton`, `AvatarGroundSurface`) replaced an earlier single-script avatar that placed the body at a fixed offset below the head.

- The IK rig is **built at play time** in a fixed constraint order (hip, spine and head, clavicles, arms, twist, legs) on Animation Rigging, with targets kept outside the skeleton under uniform scale.
- The head bone follows the headset so the avatar's eyes sit where the participant's eyes are. The torso turns only when the head turns well past it. Dropping the head with the head level bends the knees; dropping while looking down hinges the torso over the counter.
- The spine bends by CCD, and the neck takes part of the head turn.
- Feet are planted on marked floor tiles and step only when needed.
- Arms use two-bone IK from each controller with a computed elbow, shoulder assist and tracking-loss handling. Fingers curl from the trigger and grip values.
- **Height normalisation**: a facilitator button on `GameStateController` measures eye height for a second (rejecting it if the participant is looking up or down, tilting or moving) and scales the whole avatar, including arm and leg length.
- The rig is scaled at 1.5x inside the XR Origin so the apartment kit (roughly 1.5x real size) feels like a normal-height kitchen. All body lengths are computed in avatar units and multiplied by one scale factor, rather than hard-coded world offsets.

Two planning documents drove this (a review of the old avatar and a "changes I would make" spec); the code follows the second one.

<!-- TODO: verify how well the body solver works in the headset (feet, crouching, mirror), and whether it is used in all study conditions. -->

![The participant's avatar in Unity with its facial-tracking rig (blue bones) overlaid.](/images/masters/player-avatar.png "The participant avatar and its facial rig")

![Diagram: headset and controller poses feed the body solver, which poses the participant avatar; shown standing, and crouching to a low cupboard with the knees bent and the torso hinged forward.](/images/diagrams/masters-body-ik-crouch.svg "Body IK while crouching to reach a low cupboard (diagram)")

## Avatar behaviour

The EVC's behaviour is split into modules that each do one job. This section covers how it looks and sounds. The decision-making is in the next section.

### Speech in and out

- **Hearing.** The participant **holds either controller trigger to talk** (`EvcPushToTalk`). The sidecar keeps the mic open so its noise and echo estimates keep adapting, keeps about 300 ms of audio from before the press, and ends the turn 250 ms after release. The Quest's own microphone is the default. There is also an open-mic mode, filtered by webrtcvad plus level gates for the room's noise floor, the wearer's own learned level and the character's echo, with a word-overlap filter to stop the character answering itself.
- **Transcription.** faster-whisper (`base.en` on the GPU), started speculatively after a short pause so it usually finishes before the end of the turn is confirmed. Partial transcripts are streamed to a live caption (`EvcPlayerCaption`) so the participant can see what was heard.
- **Voice.** Text goes to a TTS sidecar: Kokoro-82M on the CPU by default, Chatterbox-Nano on the GPU for a more expressive voice, or Piper as a fallback. Audio streams into an `AudioSource` on the character, so it is spatialised.
- **Voice-act cache.** Lines that are already in a pre-rendered catalogue (built in a separate TTS studio project) play instantly from cached audio. Anything else is synthesised live with the same settings, so hits and misses sound alike. The hit rate is logged per sentence.
- **Latency.** On my PC with everything warm, the time from the participant stopping to the character's voice starting is roughly 0.7 to 1.0 seconds, and the debug panel breaks it down per turn.
- **Interruption.** Either speaker can interrupt the character. Detected voice ducks its volume, and only a real transcript stops it, so a false alarm does not cut it off mid-word.

### Lip sync

`EvcLipSync` uses uLipSync (an open-source package, MIT licensed) listening to the character's `AudioSource`. It classifies each audio block into the five vowels, and the component maps that to Character Creator viseme blendshapes (open, wide, tight-O) and to the **jaw bone** directly, because on this export the jaw is a bone and the viseme shapes only move the lips. Lip sync fades out while the facilitator's mocap is driving the face, so mouths do not double up.

### Facial expression and facilitator mocap

- A Python sender (`Tools/facial_mocap_sender.py`, MediaPipe Face Landmarker with blendshapes) reads a webcam and streams ARKit 52 coefficients over UDP port 11111 to `FacialMocapReceiver`. `CCFaceDriver` maps them to the CC4 Extended blendshapes and drives the head and eyes.
- I looked at Reallusion's AccuFACE first and found it only streams to iClone's Motion LIVE, and that the Unity DataLink never handles live pose frames, so MediaPipe replaced it as the capture source.
- A `FaceTuningProfile` asset holds per-shape gain, ceiling, bias and neutral overrides, plus coupling sliders (for example, a real smile suppresses the upper-lip raise, cheek squint and nose sneer that MediaPipe over-reports). Being an asset, values tuned during play mode survive stopping.
- `AvatarDirector` switches between **Human** mode (a performer drives the face) and **AI** mode (animation only), fading the face driver's weight rather than cutting. `mocapDrivesHead` can be turned off so the head stays on the participant while the face is performed.

<!-- TODO: verify whether the EVC face has any autonomous expression of its own beyond lip sync and the mocap path (e.g. smile/brow behaviours tied to speech acts), and whether EvcAnimation plays any emotional clips. -->

![Diagram: the facilitator's webcam feeds MediaPipe face landmarks; AvatarDirector blends them onto the Facilitator Virtual Character's face in Human mode, or plays animation only in AI mode, fading the face weight between the two.](/images/diagrams/masters-face-mocap.svg "Webcam facial mocap driving the facilitator character (diagram)")

![Diagram of lip sync tuning: the speech audio level is compared against a Shut Level and an Open Level; EvcLipSync, with its Gain and Jaw Open Angle settings, closes the mouth below the shut level and opens the jaw above the open level.](/images/diagrams/masters-lipsync.svg "Lip sync tuning on the EVC (diagram)")

### Gaze

`EvcGaze` decides where the character looks and `AvatarLookAt` moves body, head and eyes to do it. The body stays turned to the participant; the eyes lead and small shifts stay in the eyes.

- **No staring**: mutual gaze is held for about 2 to 4.5 seconds while listening, then broken by a short look-away. While speaking, holds are shorter and look-aways longer, usually looking away at the start of a turn and back at the end.
- **Joint attention**: it looks at an item when a spoken sentence names one, when an item is lit up, and when the participant asks about what they are holding. It aims at the item's centre of mass and then returns to the participant. Items that are currently riddles or hidden substitutes are never looked at, so gaze cannot give them away.
- Stress (from the physiological pathway) shortens every mutual-gaze hold.

### Gestures

`EvcGesture` has no animation clips. Each gesture is built in code with two-bone IK on each arm, the hand turned by palm and finger direction, and fingers curled from geometry, blended over the idle clip. That makes it work on any humanoid.

| Gesture | Trigger |
|---|---|
| Beat (1 to 3 small strokes) | as a sentence starts, with some probability and a minimum gap |
| Point | shortly after gaze turns to a named or lit item (never at a riddle item) |
| Offer (palms up) | when the assist runner steps in to help |
| Calm (palms down) | a sentence starts while stress is above a threshold |
| Thumbs up | the participant completes a step or the trial |
| Wave | the conversation starts |

Gestures stop while the participant has the floor, and when the AI is switched off. `EvcListening` adds listening behaviour (attention cues and nods while the participant talks), and `AvatarClipPlayer` plays the body idle and "take it seriously" clips through Playables with no animator controller to wire up.

![Diagram of four code-driven gestures on the character: offer with palms up, point at a lit item, thumbs up, and a wave when the conversation starts.](/images/diagrams/masters-gestures.svg "Code-driven gestures on the EVC (diagram)")

## Conversational logic

This is the "brain" (`EvcBrain` and its modules). It was built in a way that the language model has very little room to be wrong.

![The EVC brain: speech, task events, gaze and cognitive load feed a blackboard; modules produce evidence that is fused with noisy-OR into a needHelp value, which drives a fast loop and a slow loop.](/images/diagrams/masters-brain.svg "The EVC brain: a fast loop that speaks and a slow loop that only proposes")
### Fast loop, slow loop, and who speaks

- **Fast loop** (a small Qwen model on Ollama, streamed) is the only voice. It handles scripted flow, the word-for-word coaches, free replies to the participant, and running help strategies.
- **Slow loop** (a 2B model on vLLM, or Gemini on Vertex AI through `SlowModelSwitch`) runs every few seconds while nobody is talking. It writes beliefs (what the participant is doing, what they are looking for, how much help they need) and a **proposed help strategy** to the blackboard. It never speaks and never triggers anything.
- **Failure handling**: slow requests are cancelled when the participant starts talking, and abandoned after a timeout. If replies time out twice in a row or run too slowly, the brain goes into a degraded mode with fallback lines and no slow loop until a probe request succeeds.
- **The fast prompt is barebones**: role, secrets, the stage and current step, what is in the hands, what is being talked about, tone, help state and the allowed actions. Scripted lines are kept out of the model's history so it does not repeat them.

<!-- TODO: verify the current model names and sizes in the scene (README says the fast model is qwen3.5:0.8b on Ollama; the Ollama backend default is qwen3.5:2b; commit "change qwen models" changed them). -->

### Deciding when to help

- Each module reports `Pressure`, evidence from 0 to 1 that the participant needs help. The brain fuses them by **noisy-OR** into one `needHelp` belief, scaled down when the participant is holding the item they need or was just helped. Sources include time without progress on the current line (`GoalDirectionModule`), stress (`EmpathyModule`), and the slow model's estimate (`TheoryOfMindModule`).
- `EvcAssistRunner` acts when `needHelp` is high enough, nobody has spoken for a moment, and the cool-down has passed. It uses the slow model's proposed strategy if it is fresh and still valid, clamped so help escalates one level at a time, otherwise a rule ladder (cue, then locate or explain, then show).
- Help strategies are data, a closed menu of named combinations of assist steps (offer, cue, locate, explain, show, reassure, reassure and show).
- The slow model's own `needs_help` is capped by weight so it can tip a decision but not start one on its own.

### Coaches: the model never sees the hard cases

Questions that must not be left to a model are answered by code before the model is called:

- **Recipe check** (`EvcRecipeCheckCoach`): at the start of Gather the character talks through the recipe. The participant has to spot the **bad item** on the list and ask about the character's **favourite item**.
- **Riddle items** (`EvcRiddleCoach`): an abstract item such as "my favourite fruit" is shown only as a riddle until the participant asks, and the reveal line comes from the trial asset, so the model cannot leak or invent the answer.
- **Missing item** (`EvcMissingItemCoach`): one ingredient is deliberately absent, and the coach walks the participant to a substitute with a scripted ladder.
- **Held item** (`EvcHeldItemCoach`): "is this it?" is answered yes only when the pointed or looked-at item really is the target.
- **Order coach** (`EvcOrderCoach`), **cook coach** (`EvcCookCoach`) and state phrases for "where is the fridge?", "is it in here?", "what else?", "what am I looking at?", "can you hear me?" and meta questions ("are you an AI?") which get a scripted deflection back to the task.
- Selected key lines **lock push-to-talk** until they have been said.

The research-plan notes name three layers: a decision layer in deterministic C#, a language layer that turns a chosen strategy into words, and a reflective layer (the slow loop) that is advisory only.

### Help episodes and named strategies

A **help episode** is a short, rigid side conversation the character starts when the participant seems stuck. While it runs, the world is frozen (no grabbing, doors, drawers, knobs or appliances) and the character's script owns the conversation. The language model's job shrinks to two closed-set judgements, so there is nothing to hallucinate.

- **Detector** (`EvcHelpDetector`): a code gate decides whether the AI is allowed to judge (no progress for a set time, nobody spoke recently, cool-down passed, focus line has a strategy). A fast-model call then reads a roughly 100-token feature card (the goal, places opened, glances at the home, picked-up-and-put-back items) and answers yes or no.
- **Think it through**: asks where the item would usually be kept, judges the answer in code (right, wrong, don't know, say again, silence) with the model used only when the answer is unclear, then reveals the location and lights the doors if needed. One try, in line with errorless-learning caution.
- **Planning strategy** (`EvcOrderCoach`): announced by name, freezes the world and hides the checklist until the participant says which item to start first, judged in code against keywords.
- **Scanning strategy** (`Scanning.cs`, run by `EvcHelpEpisode`): on a shelf of look-alike items, the participant checks each item left to right with the shelf locked to that sequence. A branch on the **cognitive state** decides whether a missed target is re-highlighted or just called out.
- **Timed cooking** (`EvcCookCoach`): cooking runs on an exact clock with per-item times, a "done window", a cue ladder that moves from suggestion to direction, and automatic heat-off so nothing can burn.

All strategy lines are templates. The pure-C# logic (`Assets/EVC/Runtime/Help/Logic`) can be compiled and tested outside Unity with `Tools/evc_help_tests`.

![State machine of a Think-it-through help episode: a gate, a yes/no judge, an open line, a question, the answer judged in code, then right (confirm and end), wrong (retry), or out of tries (fallback and end).](/images/diagrams/masters-help-episode.svg "The Think-it-through help episode as a state machine")
![Diagram of the F1 debug overlay: the needHelp score with a bar for each source's contribution, the current strategy, the help detector's gate checks, the last prompt sent to the fast model and a latency breakdown.](/images/diagrams/masters-debug-overlay.svg "The EVC debug overlay showing why the character is about to help (diagram)")

### Understanding the participant's gaze, pointing and intent

The character also needs to work out what "this" and "that" mean, and what the participant is about to do. A gaze pipeline under `Assets/EVC/Runtime/Gaze` provides that, again as soft evidence only.

- **Sources**: head gaze from the headset (treated as a 10 degree cone, since Quest 3 has no eye tracking), with an eye-gaze slot that takes over automatically on a device that provides it, and **controller rays**, used only when they look like a deliberate point.
- **Pointing gates**: a ray counts only if XRI is drawing it, it is not holding something, it is not at the face or resting at the side, not sweeping, not parked, and its target is on screen. Passing rays are weighted by agreement with gaze and by whether the participant is speaking.
- **Targets** (`GazeTarget`, attached from outside the room scripts): items, doors and drawers, appliances, zones, the recipe board and the character. Occlusion is tested from the eyes, including shut doors, so the milk behind a closed fridge door is not a target.
- **Which door opens which place** is worked out from geometry, so that looking at a cupboard can mean looking where the salt is kept.
- **Segmentation** into glances and dwells, with onset times and gap tolerance, runs at 30 Hz in `ParticipantGazeTracker`.
- **Deixis**: when a sentence arrives, "this", "that" and "in there" are resolved to a referent, which the coaches and the fast prompt use.
- **Intent** (`GazeIntentModule`, 4 Hz): a belief over the next item given looks, points and the current step, plus an attention state such as reading the recipe, searching the right place, or seeking help.

The design cites literature for every constant; the spec notes that every number is a starting value to be tuned on play-test data.

<!-- TODO: verify how much of the gaze pipeline has been tuned in the headset. The spec (2026-10-27) says "typechecked, not yet run in Unity or the headset"; later commits ("gaze", "speach and gaze testing 1") suggest it has been tested since. -->

![Diagram seen from above: the participant's gaze cone covers several items; one controller ray passes the gates and lands on the highlighted target, which shows its score, while the other controller's ray is rejected as resting.](/images/diagrams/masters-gaze-pointing.svg "Gaze and pointing resolution in the debug overlay (diagram)")

## Environment design

### Scenes

- **`brick_appartment`**: the main study scene. A furnished apartment kitchen built from a third-party apartment kit, with the cabinets, drawers, doors, fridge, oven, stove, toaster, blender and coffee machine made interactive. Doors and drawers are watched by `DoorWatch`, with hinge and slide behaviours and per-drawer item slots. A mirror gives the participant a view of their own avatar. Both characters, the recipe whiteboard (`EVC Task Board`), the distractor props and a facilitator camera live in this scene.
- **`Training`**: a clinical white room with one bench, a to-do board and a mirror, used for familiarisation (see the interaction section).
- Unity's default `BasicScene` and `SampleScene` are left over from setup.

### Look and lighting

- Universal Render Pipeline 17.3, with a global volume profile and a mix of a directional light, point and spot lights (including a hood light, fridge light and drawer light), and a reflection probe.
- Scale is deliberate: the XR Origin is scaled 1.5x so the apartment kit reads at a normal human scale, and a counter top is 0.91 real metres high.
- Food and props come mostly from third-party packs (an apartment kit, "Simple Foods", the Pandazole pack, UnityChan assets, TextMesh Pro), plus a folder of OBJ food models (`AI_assets`) that I added for extra items.

<!-- TODO: verify what each pack is used for, whether the AI_assets OBJ food models are AI-generated (and with which tool), and which of these ship in the final study scene. -->

![The apartment kitchen in the Unity scene: fridge, hob, sink and a row of small appliances on the counter.](/images/masters/kitchen.png "The kitchen the study takes place in")

![Schematic plan of the study scene from above, not to scale: the kitchen counter and appliances, the gather zone, the serving zone, the character's position and the participant's start position.](/images/diagrams/masters-scene-layout.svg "Layout of the study scene (diagram)")

![Diagram of the white training room: a numbered to-do board on the wall and a bench holding a pot on the hob, a bottle, a lemon, a knife and a cup.](/images/diagrams/masters-training-scene.svg "The white Training scene (diagram)")

### Trials

There are four trial definitions (`Assets/Room/Trials/version2`), each a `TrialDefinition` asset, a `Goal` asset and an `EvcTrialScript` asset:

| Trial | Meal |
|---|---|
| Egg | egg on toast and coffee |
| Pizza | pizza and apple juice |
| Salad | vegetable soup and apple and carrot juice |
| Steak | steak and oven potatoes |

Each follows Gather, Prepare, Cook, Serve (the egg and pizza trials merge Prepare and Cook into one planned phase), with one riddle item (the character's "favourite"), one missing item with a substitute, and a bad item hidden in the recipe list. The scene is restarted between trials: the facilitator sets the trial number and presses play, and keeps the order fixed or counterbalanced by hand.

<!-- TODO: verify that all four trials are playable end to end, which are used in the study, and the counterbalancing plan. -->

### Task and food systems

The trial runs on a data-driven goal system rather than hard-coded scripts:

- `TrialDefinition` holds the phases, the checklist, the requirement rows per phase (for example "pot contains potato, pumpkin, parsnip"), locked appliances, and the EVC's abstract and missing items. `GoalStateCheck` evaluates the rows against item state published by anything implementing `IItemStateProvider`. `GameStateController` owns completion, so the EVC reads the verdict and never judges it.
- Items are registered with `ItemIdentity`, put out by `ItemSpawner` (with named locations, per-item anchors and dispensers), and highlighted by `ItemHighlight`.
- Food behaviours are separate components: `Cuttable` with a mesh-morphing cut, `Crackable`, `Peelable`, `Washable`, `Blendable`, `Pourable` with droplets, `Doneness`, `Spreadable` with `KnifeSpreader`, `Bowl`, `Plate`, `JuiceCup`, `Soup`. Appliances include `CookSnappable` vessels on a `StoveSnap`, toaster, oven, blender, coffee machine and a tap (`WaterController`).
- `TrialInteractionLock` can freeze grabs, doors and drawers for talks and help episodes.

![Diagram of the task whiteboard during Prepare: steps grouped under Egg and Toast, with completed lines ticked and one line highlighted as the current step.](/images/diagrams/masters-task-board.svg "The task whiteboard with grouped steps (diagram)")

![In-headset view of food interaction: a pan on the hob flagged isOiled, a toaster ring, vegetables and a task list.](/images/masters/food-interaction.png "Food items carry state, shown here as isOiled on the pan")

![Ingredient containers, a knife and numbered slots on the counter.](/images/masters/food-interaction-2.png "Items on the counter during the gather step")

## Interaction design

### How the participant acts

- **Locomotion and manipulation** use the XR Interaction Toolkit 3.4.1 starter rig: grab with the grip, teleport on marked floor areas (`GroundTeleportArea`), and physical drawer and door handles that pull open.
- **Hand input is controller-based**: the avatar's fingers curl from trigger and grip values. The XR Hands package and its samples are in the project.
- **Talking** is push-to-talk on either controller trigger. A separate on-screen caption shows what the system heard, and a "Speaking disabled" caption shows when the mic is locked (for example, while a line is being said).
- **Quantity panels** (`QuantityPanel`) are world-space panels built in code, with a slider and plus/minus buttons pressed with A/B/X/Y or grip, because the trigger is reserved for talking.
- **Cooking is physical**: pan and pot on a burner, oil poured, an egg cracked, bread sliced and put in the toaster, knife strokes judged by edge and direction, dishes plated in a serving zone.

<!-- TODO: verify whether hand tracking is used at all, or whether the study is controller-only. -->

### Familiarisation: the Training scene

A short, fixed task run before the conditions teaches the interactions the kitchen uses by making a cup of hot lemon water in 11 directed steps (get the pot, put it on the hob, fill it, turn the hob on, get a lemon, put it on the board, cut it, turn the hob off when the pot boils, pour into the cup, add a lemon half).

- A `TrainingController` runs a rigid step machine with a to-do board (`TrainingBoard`), glowing targets, and a **grab gate**: anything not needed for the current step is refused with a small red "Not yet" label (`NotYetLabel`). Doors and drawers are always free.
- Items are dispensers, so a fresh one replaces the old. If a needed item disappears, the controller **rewinds** to the earliest step whose result is no longer true.
- Boiling is scripted rather than simulated: one second after the lemon is cut, the pot shows its boiling look.
- It has **no AI character**, no machine learning and no adaptation, but its physiological data is recorded the same way as a condition session so it can be compared with the main scene. It begins with the same 30 second black baseline.
- The pure step and rewind logic is in `TrainingFlow` and covered by unit tests.

![Diagram of the training scene at step 3: steps 1 and 2 are ticked on the to-do board, the water bottle glows as the current item, and the knife shows a 'Not yet' label because the grab gate refused it.](/images/diagrams/masters-training-not-yet.svg "Training scene with the grab gate refusing an item (diagram)")

### The study conditions

The study condition is the character's **body mode**, set on `GameStateController` and applied by `StudyBodyStateController`:

| Mode | What the participant sees |
|---|---|
| 1. Separate embodied | Both characters are in the room; the EVC acts as programmed |
| 2. Detached voice | The facilitator character is hidden; the EVC acts as programmed |
| 3. Combined | The facilitator is hidden; when the AI is switched off, the facilitator's webcam face mocap drives the EVC's face, while its head stays on the participant |

The AI main switch (F3, an inspector toggle, or a command from the dashboard) silences the character mid-word and hands the face over in Combined mode. The brain's behaviour does not change across modes, only the expressers that need a body (gaze, gesture, face) drop out in Detached Voice.

<!-- TODO: verify the final set of conditions, the counterbalancing (the older code has a Latin-square ExperimentManager/Condition scaffold), and how many trials each participant does per condition. -->

![Diagram of the three study body modes: separate embodied, with both characters standing in the kitchen; detached voice, where the EVC is heard only; and combined, one EVC body with the facilitator's expression on its face.](/images/diagrams/masters-body-modes.svg "The three study body modes (diagram)")

### Session structure

A session, as designed, runs as follows:

1. Facilitator sets participant ID, trial and body mode, and presses play.
2. **Baseline**: the headset is black for 30 seconds (with a head-level indicator), then fades into the room. Markers for the start and end go into the logs.
3. Facilitator presses Start EVC conversation. The character greets the participant and opens the recipe check.
4. **Gather**, **Prepare and Cook**, **Serve**, with help episodes, strategies, timed cooking and distractors as they fire.
5. After the goal is met, participant utterances are logged for 120 seconds as debrief material.

![Timeline of one session: facilitator setup, a 30 second black baseline, start EVC conversation, recipe check talk, maths and quantity stage, gather, prepare and cook, then wrap-up.](/images/diagrams/masters-timeline.svg "The structure of one study session")
## Study design and operator tooling

### Study content

- **Scripted dialogue per trial**: opening, phase intros, step-done lines, recipe-check lines, riddle reveal, missing-item ladder and closing live in an `EvcTrialScript` asset next to each trial, with tokens such as `{step}`, `{item}`, `{place}` and `{hint}`.
- **Quantity and maths stage** (`QuantityPanelController`, `MathsStageRunner`): after the recipe check, the participant answers how-many questions about a scaled recipe on world-space panels, with hints and a "not sure" option, and the whiteboard shows amounts until the stage ends.
- **Filler shortage**: a scripted shortage (for example, only two slices of bread) handled by `FillerShortageCoach` as its own locked-in talk, using the same ladder shape as the missing item.
- **Distractors** (`Assets/Distractors`): a base `Distractor` class with passive and action types. Props include a ringing phone, a phone text message, an oven timer, radio static, and car, siren and plane pass-bys with moving lights and Doppler audio. `DistractionScheduler` fires them at phase-step completions plus a delay, and `AmbientTraffic` adds random vehicles outside the window every 40 to 90 seconds. A facilitator controller can trigger or acknowledge any of them from the keyboard.
- **Cognitive state** (`CognitiveState.IsHigh`) is one boolean, set from the live load value, that strategies branch on.

<!-- TODO: verify which distractors are used in the study, how many per session, and the stage order (the code refers to a study plan with numbered sections and decision IDs; that plan is not in the repo). -->

### Operator tooling

- **In Unity**: a `GameStateController` inspector with trial number, participant ID, study body mode, male/female head, Normalize height, End baseline and Start EVC conversation, an on-screen control strip, and a keyboard map (F1 debug panel, F2 subtitles, F3 AI on/off, F4 mic owner, F5/F6 highlights, F7 voice-act mode or desk push-to-talk, F8 facilitator talking, F9/F10 skip or advance the recipe talk).
- **The debug overlay** (F1) shows state, modules, `needHelp` and its sources, the full prompts with latency per stage, an event log, a mic meter with the gate marked, typed input for desk testing and a stress slider.
- **V-CORE dashboard link** (`TrialContextReporter`): sends the trial as data (phases, steps, goals, the character's per-step instruction, affordances), the participant's current phase and progress, and the character's 1 to 5 rating of each step as it ends (`StepRatingModule`, advisory only). It receives assist buttons ("highlight the pan"), a clear command, and the AI on/off switch, and reports the switch state back so the dashboard button is always right.
- **Live view of the headset**: feed cameras follow the headset through `StabilisedFeedCamera`, which locks pitch and roll, uses a dead zone and smooths motion so the video is watchable, and publishes via LiveKit.

The dashboard side (schema-driven signal display, rule engine, session recording, video mirror) is described on its own page: [Real-time study dashboard](/projects/realtime-study-dashboard).

![Diagram of the facilitator controls in Unity: the GameStateController inspector in play mode with trial number, participant ID, study body mode, a male toggle and Normalize height and Start EVC conversation buttons, beside the Game view with its on-screen control strip.](/images/diagrams/masters-facilitator-controls.svg "Facilitator controls in Unity (diagram)")

![Diagram of the operator dashboard during a session: the live mirrored headset view, trial progress through the Gather, Prepare, Cook and Serve phases, and the AI switch button.](/images/diagrams/masters-operator-dashboard.svg "Operator dashboard view of a running session (diagram)")

## Physiological sensing

### Signals and streams

| Signal | Source | Notes |
|---|---|---|
| EEG, 8 channels (F3, F4, Fz, P3, P4, Pz, O1, O2) | EEG headset over LSL | `LSL_EEG_Inlet`; 250 Hz expected |
| Skin conductance (EDA) and PPG | Shimmer unit over LSL | `LSL_Shimmer_Inlet`; 256 Hz expected |
| Cognitive-load prediction | model service over LSL | `lsl_emotions_inlet` / `emotions`, 5 float channels, read by position |
| Task and baseline markers | Unity | `GameStateLog` events, written to CSV; an LSL marker stream is specified |

![A Shimmer sensor on the wrist with finger electrodes for skin conductance and pulse.](/images/masters/shimmer.png "The Shimmer unit measures skin conductance and pulse from the hand")

![An EEG cap on a head, seen from the side.](/images/masters/eeg-cap.png "The EEG cap")

- **Streaming the Shimmer.** I use the lab's Shimmer C# API application (`ECL-Shimmer-C-API`, which I have cloned), a GUI that connects to a Shimmer3 over Bluetooth and streams the data on LSL. **Lab Streaming Layer** (also cloned locally) and the LSL4Unity package supply the transport and the Unity inlet base classes. I did not write these; my part is the Unity side and the rest of the pipeline.
- **Inlets and re-publishing.** The Unity inlets accept several channel layouts (8-channel, 4-channel and 3-channel Shimmer, 8-, 16- and 17-channel EEG), log what they read, and re-publish through `LSL_EEG_Outlet` and `LSL_Shimmer_Outlet` with a baseline tag so any recorder gets an honest rest flag.
- **Mock sensors** (in the dashboard repo) produce synthetic EEG and GSR at the correct rates, with comments marking every number to reassess with real sensors, so the whole pipeline can be run with no hardware.

<!-- TODO: verify which EEG headset is used (the inlet accepts 8, 16 and 17-channel layouts, including a Unicorn-style layout), which hand wears the Shimmer, whether the EEG sits under the Quest strap, and what I changed in the forked Shimmer app and LSL clone versus upstream. -->

### Cognitive-load model on LSL

I designed (and in part built) a pipeline that turns the raw streams into a cognitive-load estimate the EVC can use:

```
EEG + GSR (LSL) ---+
Unity markers -----+--> model service (Python) --> prediction stream (LSL) --> Unity EVC + dashboard
```

- The model is a Random Forest from a colleague's earlier shopping-task study, trained on EEG and GSR windows with leave-one-subject-out validation. I treat it as an existing model and do not claim it. The files and their provenance are in `Tools/evc_cognitive_load/models`.
- A sidecar reads the **raw** sensor streams (never Unity's re-published ones), calibrates on the 30 second black baseline, then publishes a probability of high load about every 10 seconds over a 20 second window. Status codes report waiting, calibrated, short baseline and calibration failed.
- On the Unity side, `LSLGetEmotion` reads the five-channel layout by position and `LslCognitiveStressSource` supplies the value to `EmpathyModule`, treating the stream as stale after 25 seconds.
- "High" means high relative to that participant's own typical load during the task, not relative to rest.

**Status of this pathway.** Unity-side reading and logging are written, and the mock pipeline exercises them. The model-service script itself is not yet in the project (only the model files and provenance are), and the `evc_markers` marker outlet specified in the design is not yet implemented.

<!-- TODO: John to confirm the actual state of the model service (it may live in another folder or machine) and whether any real-participant EEG/GSR has been streamed through it. -->

![Physiological data flow: EEG and Shimmer EDA/PPG stream over LSL to both Unity inlets (logged to CSV) and a cognitive-load model service that calibrates on a 30 s baseline, scores 20 s windows and publishes a prediction stream back to Unity.](/images/diagrams/masters-physiology.svg "Physiological data flow over LSL")
![Diagram of the participant setup: a person wearing the Quest headset and an EEG cap, with a Shimmer sensor on the hand for skin conductance; the signals stream over LSL to the study PC.](/images/diagrams/masters-participant-setup.svg "A participant wearing the headset and sensors (diagram)")

### How physiology is meant to be used

My research-plan notes (a revision written once the load model existed) set out rules for how the signal may influence the character:

- Physiology **never acts alone**. It may delay help, change how help is delivered, or at most bring forward a neutral check-in. Task content (a hint, a reveal) always needs behavioural evidence.
- Physiology is **never spoken**. The language model sees style constraints (for example "one sentence, at most 8 words"), never state labels or numbers.
- Every signal carries its window and its quality, and the agent falls back to behaviour-only when the signal health is poor.
- Load is not distress. The appraisal crosses load with task progress so productive effort is protected rather than relieved.
- The planned analyses include the physiological cost of the character's own interruptions in each body mode, and a go/no-go check of the model on this interactive VR task, with a behaviour-only appraiser as the fallback.

Only parts of this are implemented: stress above a threshold shortens gaze holds, triggers calming gestures and adds help evidence, and `CognitiveState` drives scanning and cook cues. The timing and delivery policy is design only.

<!-- TODO: John to state which parts of docs 10-16 (interruptibility, state-dependent nudge clock, load by progress appraiser, agent-cost monitor) are planned versus built, and whether the pilot go/no-go has been run. -->

## Data pipeline and logging

- **Physiological CSVs** (`DataLogger`): GSR, EEG, companion (character speaking state) and predicted-emotion files, named by participant ID, condition and session timestamp, inside a dated folder per day. The prediction file now carries class, both probabilities, status, emotion, the current section and whether the user was speaking.
- **Study events** (`GameStateLog`, `StudyEventCsv`): one `study_events` CSV with every task event, plus participant utterances for 120 seconds after the goal is met. Baseline start/end are stamped into the physiological logs as sections.
- **EVC decision log**: events such as `evc_assist` (need, source plan/rule/forced, reasons), `evc_judge`, `evc_scan`, `evc_gesture`, `evc_gaze`, `cook_cue`, `cook_auto_off`, `plan_talk`, `recipe_talk`, `cognitive_state`, `heat_started` / `heat_stopped` and `tts_cache hit|miss`. The aim is that every spoken line can be traced to a trigger, evidence and a strategy.
- **Dashboard side**: the V-CORE backend records sessions to XDF, SQLite and video.
- **Speech sidecar**: reports a per-turn latency breakdown that appears in the debug panel.

<!-- TODO: verify the final file formats and field lists a participant session produces, where files end up on the study PC, and how data are merged across the physiological, event and dashboard recordings (e.g. a shared clock). -->

![Diagram of the files written for one session: a dated session folder holding GSR, EEG, Companion and predEmotion CSV files and a study_events folder.](/images/diagrams/masters-session-files.svg "Files written for one session (diagram)")

## Process

Selected milestones from the project's commit history (128 commits so far).

### 2026-08 — Kitchen and task machinery

Initial check-in on 24 August, the apartment scene the next day, then drawers and doors that open and slide, a recipe-goal completion system, item respawning, and appliances one by one (toaster, blender, coffee machine, oven).

### 2026-09 — More food and the first character

Cooking behaviours (egg cracking, spreads, salt, pizza), then the first character import and the spawn system in the second half of the month.

### 2026-10 — The AI character and its body

The first AI work landed mid-October. The cognitive-load pipeline design and the avatar body and speech reviews were written on 21 October. On 27 and 28 October a round of play-test fine-tuning added the live caption of what the participant says, push-to-talk on the Quest mic, a head-level indicator for the baseline, and the voice-act cache; new avatar skins and a lower-resolution facilitator followed.

### 2026-11 — Help episodes, strategies and training

A cloud option for the slow loop (29 October), then help episodes (3 November), planning and scanning strategies with timed cooking (5 November), and the Training scene (10 November). The salad trial design is dated 22 October. The most recent commit adds the cook and order coaches, help logic, training runtime and study assets.

## Current status

As of mid-November 2026 the project is in progress.

**Working in the project:** the kitchen and four trial definitions, the food and appliance systems, the EVC with speech in and out, lip sync, gaze, gestures and the coach set, help episodes and strategies, timed cooking, the Training scene, the three body modes, the dashboard link and the CSV logging.

**Specified but not complete:** the cognitive-load model service and marker stream, and the physiology-driven timing and delivery policy.

**Next:** pilot sessions to tune the thresholds and decide whether physiological signals should act on the character, then the study itself.

<!-- TODO: John to fill in: number of pilot sessions run so far (do not guess), ethics approval status, planned participant count and population, planned study dates, and anything already learned from play-testing. No results are reported on this page. -->

<!-- TODO: John to add the thesis deadline / submission status and any outputs (paper, poster, demo video). -->

![Diagram in three frames of a help interaction: the participant asks where the butter is, the character looks at the fridge and points to it, and the fridge door glows.](/images/diagrams/masters-help-interaction.svg "A full help interaction in the kitchen (diagram)")
