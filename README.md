# custom CTR

Vue 3 + Vite + TypeScript + Tailwind

## Checks

- [] You must have a minimum number of 6 fields. Except for the first field, the inputs should be disabled.
- [] You can only fill the inputs from top to bottom. After filling the first input, the second field should be enabled, and so on…
  When focusing out of an input the value in “unattributed” should be updated with the remaining value to 100.
- [] Clicking on the value at the top will fill the last empty field input with the remaining value. If the last field is not empty, a new field is added.
- [] You will have a “Add another field” button at the end of the list.
  - [] You cannot add a field if the previous one is empty.
- [] You can only enter digits and “.” in the inputs. Values can have an indefinite number of decimals but displaying should follow these rules:

  - [] for values that are between -10 and 10 (not included), you should have 2 decimals displayed. for the rest only one.
  - [] On hover over the input, the unformatted value should be displayed in a tooltip
  - [] The value of the current input must be lower than the previous - an error should appear below the field
  - [] The sum of all fields must be 100

- [] Every field should be removable, but there should always be at least 6 fields. When you hover over a field, a trash can icon should appear. Clicking on it will remove the field. If you have 6 fields or fewer, the icon does not appear.

- [] The apply button should be disabled until all validations pass

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
