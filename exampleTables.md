
## LLM model comparison

| Model             |   MMLU   |  C-Eval  |  GSM8K   |   MATH   | HumanEval |   MBPP   |   BBH    |  CMMLU   |
|:------------------|:--------:|:--------:|:--------:|:--------:|:---------:|:--------:|:--------:|:--------:|
|                   |  5-shot  |  5-shot  |  8-shot  |  4-shot  |  0-shot   |  3-shot  |  3-shot  |  5-shot  |
| LLaMA2-7B         |   46.8   |   32.5   |   16.7   |   3.3    |   12.8    |   20.8   |   38.2   |   31.8   |
| LLaMA2-13B        |   55.0   |   41.4   |   29.6   |   5.0    |   18.9    |   30.3   |   45.6   |   38.4   |
| LLaMA2-34B        |   62.6   |    -     |   42.2   |   6.2    |   22.6    |   33.0   |   44.1   |    -     |
| ChatGLM2-6B       |   47.9   |   51.7   |   32.4   |   6.5    |     -     |    -     |   33.7   |    -     |
| InternLM-7B       |   51.0   |   53.4   |   31.2   |   6.3    |   10.4    |   14.0   |   37.0   |   51.8   |
| InternLM-20B      |   62.1   |   58.8   |   52.6   |   7.9    |   25.6    |   35.6   |   52.5   |   59.0   |
| Baichuan2-7B      |   54.7   |   56.3   |   24.6   |   5.6    |   18.3    |   24.2   |   41.6   |   57.1   |
| Baichuan2-13B     |   59.5   |   59.0   |   52.8   |   10.1   |   17.1    |   30.2   |   49.0   |   62.0   |
| Yi-34B      	  	  |   76.3   |   81.8   |   67.9   |   15.9   |   26.2    |   38.2   |   66.4   |   82.6   |
| XVERSE-65B      	 |   70.8   |   68.6   |   60.3   |    -     |   26.3    |    -     |    -     |    -     |
| **Qwen-1.8B**     |   45.3   |   56.1   |   32.3   |   2.3    |   15.2    |   14.2   |   22.3   |   52.1   |
| **Qwen-7B**       |   58.2   |   63.5   |   51.7   |   11.6   |   29.9    |   31.6   |   45.0   |   62.2   |
| **Qwen-14B**      |   66.3   |   72.1   |   61.3   |   24.8   |   32.3    |   40.8   |   53.4   |   71.0   |
| **Qwen-72B**      | **77.4** | **83.3** | **78.9** | **35.2** | **35.4**  | **52.2** | **67.7** | **83.6** |


## Metric / other 
| Text  |   Weight           |  Area                   |  Volume               | Numbers     | bytes        |
|:-----:|:------------------:|:-----------------------:|:---------------------:|:-----------:|:------------:|
| A     |   5 grams          |   10 km sq              |   1001 cm³            | 200         | 1 KB         |
| B     |   2001 kg          |   200 meters squared    |   1.76 cubic meters   | 3B          | 20 terabytes |   
| C     |   100 kilo         |   3 cm²                 |   1 liter             | 82k         | 1.1k bytes   |
| D     |   200 mg           |   301 mm²               |   100 ml              | 10 million  | 1 GB         |
| E     |   5001 mg          |   5,350 square meters   |   20 km cubed         | 1 trillion  | 200 MB       | 
| F     |   1 trillion grams |   65,610 km²            |   -                   | 1,001k      | 500 exabytes |
| G     |   2,500 tons       |   1,250 m²              |   2,500 cubic meters  | 1m          | 900 petabytes|
| H     |   2 tons           |   -                     |   1002 cm ^3          | 123,456     | 1 yottabytes |


## Imperial / other
| Text  | Weight   |  Area                |  Volume               |  bits        |  Semantic versioning |
|:-----:|:--------:|:--------------------:|:---------------------:|:------------:|:--------------------:|
| A     |   5 oz   |   10 miles sq        |   3000 in³            |  1 kb        |  version 2.001.91    | 
| B     |   17 oz  |   200 yards squared  |   1.76 cubic feet     |  20 terabits |  version 12.123.95   |
| C     |   1 lbs  |   3 in²              |   1 gallon            |  1.1k bits   |  version 2.35.15     |
| D     |   5 tons |   1 trillion mi²     |   3 quarts            |  1 gb        |  version 12.123.96   |
| E     |   -      |   5,350 square yards |   2 pint              |  200 mb      |  version 2.4.001     |
| F     |   1m oz  |   65,610 mi²         |   17 cups             |  500 ebits   |  version 2.4.01      |
| G     |   -      |   1,250 yd²          |   2,500 cubic yards   |  2 gbits     |                      |
| H     |   -      |   -                  |   -                   |  1 yottabits |                      |

