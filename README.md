This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Splitting a string into tags

This exercise mimics one of the tasks we need to carry out in our webapp to present users with correctly styled text. You need to write code which loads a selection of different arrays of tags, and then renders the same piece of text broken up using each of the sets of tags, all on the same page.

## `HighlightedText.tsx`

You need to write an implementation of this component as follows. Given a piece of text:

```ts
const text = "this is a string";
```

and a list of tags and their start and end positions in that text:

```ts
const tags = [
  {
    tag: "strong",
    indices: [5, 7],
  },
  {
    tag: "em",
    indices: [0, 4],
  },
  {
    tag: "span",
    indices: [5, 15],
  },
  {
    tag: "a",
    indices: [15, 16]
  }
];
```

the completed `HighlightedText` component should render:

```html
  <em>this</em> <span><strong>is</strong> a strin</span><a>g</a>
```

The tags must be opened and closed at the given character positions in the text. Styling has already been provided, so the output should be easy to assess visually.

Here is a list of rules that need to be followed:

1. You should show an error if a tag's indices are wrong:
   - If its start index is greater than the end index: `[2, 0, "em"]` should be rejected.
   - If either index is out of bounds in the string (negative or greater than the length of the string).
2. You should show an error if two tags are interleaved. A tag that starts after another must close before it. So, the following is correct:
   ```html
   <em><strong>text</strong>some text after</em>
   ```
   but, the following is wrong:
   ```html
     <em>some text before<strong>text</em>some text after</strong>
   ```
   because `strong` is closed after `em`, even though `em` was opened first.
3. If two tags have the same indices, they should be opened in the order they appear in the original list.
   So:
   ```ts
   assert.equal(
     addTags("xy", [
       [0, 2, "em"],
       [0, 2, "strong"],
     ]),
     "<em><strong>xy</strong></em>"
   );
   ```
4. If two tags share only one index, they should be opened and closed in whatever order necessary to ensure they are not interleaved.
   So:
   ```ts
   assert.equal(addTags("xy", [[0, 1, 'em'], [0, 2, 'strong']]) == "<strong><em>x</em>y</strong>"
   ```
   even though `em` appears before `strong` in the list.
5. Is your solution computationally efficient? Explain why or why not and mention how it could be improved. What is its complexity? Use comments in the javascript code.

### Testing

Your `HighlightedText` code needs to be written in a way which makes it testable, and you need to write tests demonstrating that it works. Instructions on writing tests in projects scaffolded with *Create React App* can be found [here](https://create-react-app.dev/docs/running-tests). There are a variety of different ways you could test your code, and it's totally up to you which you choose, provided they test the five criteria given above. Note that the component should show clear errors in the event that the input fails either of the first two criteria.

## `App.tsx`

You also need to update this component to efficiently load the selection of tags arrays in `/public/tags-arrays.json` so that they can be passed into the `HighlightedText` components for rendering. Your solution should handle edge cases and confirm that the data is in the expected format before trying to use it.

Note that you _should not_ `import` the tags arrays - the exercise is designed to test your ability to load data during the component's life-cycle, not during the build process.

Some example arrays of tags have been provided in `/public/tags-arrays.json`, but you need to expand this selection to ensure you have examples which cover all of the requirements listed above.

Note that we _do not_ require tests for this component, manual QA is sufficient.

## Submission

Submit your implementaion [as a pull request](https://help.github.com/articles/creating-a-pull-request/) against this repo. The pull request should, at a minimum, change the following three files:

1. `src/HighlightedText.tsx`
2. `src/App.tsx`
3. `public/tags-arrays.json`

You will also need to add at least one test spec, as described above. Feel free to add any relevant explanations or notes as code comments in the files.
