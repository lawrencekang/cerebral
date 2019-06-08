# Store:

## State
Questions: JSON array of Question objects loaded from store action.

Conversation: array of objects:

```json
{
  speaker: string - name of who’s speaking
  text: string - what the person said
  timestamp: Date object - when the person
}
```

Current Question: int to keep track of where we are in the sequence of Questions


## Actions
