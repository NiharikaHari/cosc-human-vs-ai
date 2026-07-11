# Credits & Attribution

All round content in this game is real, honestly-sourced material - nothing was
generated to impersonate a human, and every AI-authored item is genuinely AI-made.
This file is the attribution ledger for every third-party asset used. The same
information is also available live in-app via the Sources page
(`GET /api/rounds/sources`), driven directly off each round's `source` field.

## Text (server/data/rounds/text.json)

Sourced from the **HC3 dataset** (Hello-SimpleAI/HC3), licensed **CC-BY-SA 4.0**.
https://huggingface.co/datasets/Hello-SimpleAI/HC3

Each pair below is one real human answer and one real ChatGPT answer to the same
question, drawn from HC3's `reddit_eli5`, `finance`, `medicine`, `open_qa`, and
`wiki_csai` splits.

| Round IDs | Question | Human source | AI source |
|---|---|---|---|
| text-01 / text-02 | SD vs HD TV channels | Reddit r/explainlikeimfive contributor | ChatGPT (gpt-3.5) |
| text-03 / text-04 | Credit cards & debt-to-income ratio | Reddit r/personalfinance contributor | ChatGPT (gpt-3.5) |
| text-05 / text-06 | Chest pain medication question | Dr. Dorina Gurabardhi | ChatGPT (gpt-3.5) |
| text-07 / text-08 | What are "add ons"? | Wikipedia contributor | ChatGPT (gpt-3.5) |
| text-09 / text-10 | Human intelligence | Wikipedia contributors | ChatGPT (gpt-3.5) |

## Code (server/data/rounds/code.json)

Human snippets are real, unmodified source code from permissively-licensed
open-source projects. AI snippets were written fresh for this game by Claude
(Anthropic) to solve the equivalent task - genuinely AI-authored, not a
disguised copy of the human code.

| Round IDs | Task | Human source | License |
|---|---|---|---|
| code-01 / code-02 | Binary search insertion point | CPython `Lib/bisect.py` (3.6 branch) | PSF License |
| code-03 / code-04 | Chunk an array | lodash `chunk.js` (4.17.21-es tag) | MIT License |
| code-05 / code-06 | Fisher-Yates shuffle | CPython `Lib/random.py` (3.6 branch) | PSF License |
| code-07 / code-08 | Flatten a nested array | lodash `flattenDepth.js` (4.17.21-es tag) | MIT License |

## Images & artwork (server/data/rounds/images.json, server/data/assets/images/)

Human photos are real wildlife photographs, all Featured Pictures on Wikimedia
Commons by photographer **Charles J. Sharp**, licensed CC BY-SA 4.0. Human
illustrations are real hand-drawn paleoart by illustrator **Nobu Tamura**,
licensed CC BY-SA 3.0.

AI images are real AI-generated art already published (and categorized as such)
on Wikimedia Commons under `Category:AI-generated images`.

| File | Type | Author | License | Source |
|---|---|---|---|---|
| human-kestrel.jpg | Photo | Charles J. Sharp | CC BY-SA 4.0 | [Commons](https://commons.wikimedia.org/wiki/File:Mauritius_kestrel_(Falco_punctatus).jpg) |
| human-platypus.jpg | Photo | Charles J. Sharp | CC BY-SA 4.0 | [Commons](https://commons.wikimedia.org/wiki/File:Duck-billed_platypus_(Ornithorhynchus_anatinus)_Scottsdale.jpg) |
| human-hawkmoth.jpg | Photo | Charles J. Sharp | CC BY-SA 4.0 | [Commons](https://commons.wikimedia.org/wiki/File:Hummingbird_hawk_moth_(Macroglossum_stellatarum)_in_flight.jpg) |
| human-chameleon.jpg | Photo | Charles J. Sharp | CC BY-SA 4.0 | [Commons](https://commons.wikimedia.org/wiki/File:Blue-legged_chameleon_(Calumma_crypticum)_male_Ranomafana.jpg) |
| human-agama.jpg | Photo | Charles J. Sharp | CC BY-SA 4.0 | [Commons](https://commons.wikimedia.org/wiki/File:Roughtail_rock_agama_(Stellagama_stellio_brachydactyla).jpg) |
| human-baryonyx.jpg | Illustration | Nobu Tamura | CC BY-SA 3.0 | [Commons](https://commons.wikimedia.org/wiki/File:Baryonyx_BW.jpg) |
| human-elasmosaurus.jpg | Illustration | Nobu Tamura | CC BY-SA 3.0 | [Commons](https://commons.wikimedia.org/wiki/File:Elasmosaurus_NT.jpg) |
| human-umoonasaurus.jpg | Illustration | Nobu Tamura | CC BY-SA 3.0 | [Commons](https://commons.wikimedia.org/wiki/File:Umoonasaurus_BW.jpg) |
| ai-greenwood-city.jpg | AI art (Midjourney) | Dennis Sylvester Hurd | CC0 | [Commons](https://commons.wikimedia.org/wiki/File:%27Greenwood_Estates_Vista_City%27_by_Midjourney.jpg) |
| ai-night-city.jpg | AI art (Midjourney) | Dennis Sylvester Hurd | CC0 | [Commons](https://commons.wikimedia.org/wiki/File:%27Night_898%27_fantasy_past_city_by_Midjourney.jpg) |
| ai-mars-dome.jpg | AI art (DALL-E 3) | Raresvent | Public domain | [Commons](https://commons.wikimedia.org/wiki/File:A_city_on_Mars_under_a_glass_dome_with_forests,_fields,_lakes,_houses.jpg) |
| ai-future-airplane.jpg | AI art (Bing Image Creator) | Bing Image Creator | Public domain | [Commons](https://commons.wikimedia.org/wiki/File:Airplane_of_the_future.jpg) |
| ai-romantic-fantasy.jpg | AI art (DALL-E 3) | WikiJunkie (he.wikipedia) | Public domain | [Commons](https://commons.wikimedia.org/wiki/File:Generic_look_of_Romantic_Fantasy_-_made_with_DALL-E_3.jpg) |
| ai-serpent-lotan.png | AI art (Midjourney) | Midjourney | Public domain | [Commons](https://commons.wikimedia.org/wiki/File:Lotan,_a_serpent_with_seven_heads,_by_Midjourney.png) |
| ai-blue-fairy.jpg | AI art | Andrew Pertsev | CC0 | [Commons](https://commons.wikimedia.org/wiki/File:Blue_Fairy.jpg) |
| ai-dragon-art.png | AI art | Anishda | CC BY-SA 4.0 | [Commons](https://commons.wikimedia.org/wiki/File:Dragon_AI_art.png) |

## Voice (server/data/rounds/voice.json, server/data/assets/audio/)

Human clips are real public-domain audiobook recordings from **LibriVox**,
*Short Poetry Collection 277*. AI clips need no hosted audio at all - they're
synthesized live in the browser via the Web `SpeechSynthesis` API at play time,
which is a genuine synthetic voice with no licensing considerations.

| File | Poem | Reader | Source |
|---|---|---|---|
| human-gods-world.mp3 | "God's World" by Edna St. Vincent Millay | PaulClayton | [LibriVox](https://librivox.org/short-poetry-collection-277-by-various/) |
| human-just-think.mp3 | "Just Think!" by Robert W. Service | Bruce Kachuk | [LibriVox](https://librivox.org/short-poetry-collection-277-by-various/) |
| human-loiseau-bleu.mp3 | "L'oiseau bleu" by Mary Coleridge | Winston Tharp | [LibriVox](https://librivox.org/short-poetry-collection-277-by-various/) |
| human-meditations.mp3 | Verse from Marcus Aurelius's "Meditations" | minneapolis | [LibriVox](https://librivox.org/short-poetry-collection-277-by-various/) |
| human-a-prayer.mp3 | "A Prayer" by Alfred Noyes | Winston Tharp | [LibriVox](https://librivox.org/short-poetry-collection-277-by-various/) |

LibriVox recordings are dedicated to the public domain
(https://creativecommons.org/publicdomain/mark/1.0/).
