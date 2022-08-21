# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
According to me, the main components of a good code are:
1. Readability.
2. Clarity.
3. Separation of concerns into separate functions.
Since hashing is something that does not need to be looked at again. We can separate it into a separate function..
We have provided comments to ensure good understanding of the code in future.
We have tried to structure the code which makes it more direct and easy to understand without if else conditions that makes it difficult to understand it.
Have kept te multiple conditions separated instead of clubbing them for better readability.