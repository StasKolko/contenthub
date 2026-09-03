# Cache Cleaner

[Back to README](../../README.md)

---

## Purpose

Cache Cleaner removes configured cache directories from the repository.

Run it from the repository root:

```bash
bun run clean:cache
```

The list of directories is defined in:

```text
scripts/cache-cleaner/src/run.ts
```

To remove additional cache directories, add their names to the
`directoryNames` list in that file.