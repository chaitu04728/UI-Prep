import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Git Commands | Next.js Explorer",
  description: "Complete Git reference: init, clone, commit, branch, merge, rebase, stash, and 60+ more commands with technical examples.",
};

interface GitCommand {
  id: string;
  category: string;
  badgeClass: string;
  title: string;
  desc: string;
  code: string;
  note: string;
}

const gitCommands: GitCommand[] = [
  // ─── INITIALIZATION & CONFIGURATION ─────────────────────────────────────────
  {
    id: "init",
    category: "Setup",
    badgeClass: "badge-green",
    title: "git init",
    desc: "Initialize a new Git repository in the current directory. Creates a .git subdirectory with all repository metadata. Converts an unversioned project into a Git repository.",
    code: `# Initialize new repo
git init

# Initialize with specific branch name
git init --initial-branch=main

# Initialize bare repo (for remote servers)
git init --bare

# Initialize with template
git init --template=/path/to/template`,
    note: "A bare repository has no working directory — used for central repos that developers push to. Regular repos have both .git metadata and working files.",
  },
  {
    id: "clone",
    category: "Setup",
    badgeClass: "badge-green",
    title: "git clone",
    desc: "Create a local copy of a remote repository. Downloads entire history and checks out the default branch. Sets up remote tracking automatically.",
    code: `# Clone repository
git clone https://github.com/user/repo.git

# Clone into specific directory
git clone https://github.com/user/repo.git my-folder

# Clone specific branch
git clone -b develop https://github.com/user/repo.git

# Shallow clone (last N commits only)
git clone --depth 1 https://github.com/user/repo.git

# Clone with submodules
git clone --recursive https://github.com/user/repo.git`,
    note: "Shallow clones save bandwidth but limit history. Use --depth=1 for CI builds or large repos where history isn't needed. Clone automatically names remote as 'origin'.",
  },
  {
    id: "config",
    category: "Setup",
    badgeClass: "badge-green",
    title: "git config",
    desc: "Configure Git settings at system, global (user), or local (repo) level. Local overrides global, global overrides system. Essential for identity and behavior customization.",
    code: `# Set user identity (required for commits)
git config --global user.name "John Doe"
git config --global user.email "john@example.com"

# Set default editor
git config --global core.editor "code --wait"

# Set default branch name
git config --global init.defaultBranch main

# Configure line endings (Windows)
git config --global core.autocrlf true

# Configure line endings (Mac/Linux)
git config --global core.autocrlf input

# View all config
git config --list

# View specific value
git config user.name

# Local repo config (no --global)
git config user.email "work@company.com"`,
    note: "Priority: --local > --global > --system. Always set user.name and user.email before first commit. Use --local for work/personal email separation.",
  },

  // ─── BASIC SNAPSHOTTING ────────────────────────────────────────────────────
  {
    id: "status",
    category: "Basic",
    badgeClass: "badge-blue",
    title: "git status",
    desc: "Show the working tree status. Displays staged changes, unstaged modifications, and untracked files. Essential for understanding current state before commit.",
    code: `# Full status
git status

# Short format
git status -s
# Output: M modified, A added, D deleted, ?? untracked

# Show branch and tracking info
git status -sb

# Ignore submodules
git status --ignore-submodules`,
    note: "Three states: untracked (new files), modified (changed existing files), staged (ready for commit). Always check status before committing.",
  },
  {
    id: "add",
    category: "Basic",
    badgeClass: "badge-blue",
    title: "git add",
    desc: "Stage changes for the next commit. Adds file content to the index (staging area). Only staged changes are included in commit.",
    code: `# Stage specific file
git add file.txt

# Stage all changes (new, modified, deleted)
git add .

# Stage all tracked files (ignores new)
git add -u

# Interactive staging
git add -i

# Patch mode (stage partial changes)
git add -p file.txt

# Stage all files matching pattern
git add *.js

# Stage directory
git add src/`,
    note: "git add . stages everything in current directory and below. git add -p lets you stage hunks within files — powerful for creating atomic commits.",
  },
  {
    id: "commit",
    category: "Basic",
    badgeClass: "badge-blue",
    title: "git commit",
    desc: "Record staged changes to the repository. Creates a snapshot with unique SHA-1 hash. Each commit has author, timestamp, message, and parent commit reference.",
    code: `# Commit with inline message
git commit -m "Add user authentication"

# Commit with detailed message (opens editor)
git commit

# Stage and commit tracked files
git commit -am "Fix login bug"

# Amend last commit (rewrite history)
git commit --amend -m "Fixed typo in message"

# Amend without changing message
git commit --amend --no-edit

# Commit with specific author
git commit --author="Jane <jane@example.com>" -m "Msg"

# Empty commit (for CI triggers)
git commit --allow-empty -m "Trigger build"`,
    note: "Commit messages: first line = summary (50 chars max), blank line, then detailed explanation. Use --amend ONLY on local commits before push. Never amend pushed commits.",
  },
  {
    id: "diff",
    category: "Basic",
    badgeClass: "badge-blue",
    title: "git diff",
    desc: "Show changes between commits, working tree, and staging area. Essential for reviewing modifications before staging or committing.",
    code: `# Show unstaged changes
git diff

# Show staged changes (what will be committed)
git diff --staged
# or: git diff --cached

# Show changes between commits
git diff HEAD~2 HEAD

# Show changes in specific file
git diff file.txt

# Show word-level diff
git diff --word-diff

# Show stat summary
git diff --stat

# Compare branches
git diff main..feature-branch

# Show changes by author
git diff --author="John"`,
    note: "git diff = unstaged changes. git diff --staged = staged changes. git diff HEAD = all changes (staged + unstaged). Use --word-diff for prose/documentation.",
  },
  {
    id: "rm",
    category: "Basic",
    badgeClass: "badge-blue",
    title: "git rm",
    desc: "Remove files from working tree and index. Stages the deletion for next commit. Different from regular rm — this tells Git to stop tracking the file.",
    code: `# Remove file and stage deletion
git rm file.txt

# Remove directory recursively
git rm -r folder/

# Keep file locally, remove from tracking
git rm --cached file.txt

# Force removal (even with unstaged changes)
git rm -f file.txt

# Remove files matching pattern
git rm *.log

# Dry run (preview what would be removed)
git rm -n *.log`,
    note: "Use --cached to untrack files without deleting them locally (useful for .env, logs, etc.). Remember to add to .gitignore after using --cached.",
  },
  {
    id: "mv",
    category: "Basic",
    badgeClass: "badge-blue",
    title: "git mv",
    desc: "Rename or move files while preserving Git history. Equivalent to mv + git rm + git add but as a single atomic operation.",
    code: `# Rename file
git mv old-name.txt new-name.txt

# Move file to directory
git mv file.txt src/

# Move and rename
git mv components/Button.js src/ui/Button.tsx

# Force move (overwrite destination)
git mv -f source.txt destination.txt`,
    note: "Git tracks content, not filenames. Git detects renames even if you use regular mv + git add, but git mv is cleaner and atomic.",
  },

  // ─── BRANCHING & MERGING ───────────────────────────────────────────────────
  {
    id: "branch",
    category: "Branching",
    badgeClass: "badge-purple",
    title: "git branch",
    desc: "List, create, or delete branches. Branches are lightweight pointers to commits. Essential for parallel development and feature isolation.",
    code: `# List local branches
git branch

# List all branches (local + remote)
git branch -a

# List remote branches only
git branch -r

# Create new branch (don't switch)
git branch feature-x

# Delete branch (safe)
git branch -d feature-x

# Force delete branch (with unmerged changes)
git branch -D feature-x

# Rename current branch
git branch -m new-name

# Rename specific branch
git branch -m old-name new-name

# Show branches with last commit
git branch -v

# Show merged branches
git branch --merged

# Show unmerged branches
git branch --no-merged`,
    note: "Branches are just 41-byte files containing a commit SHA. Creating/deleting branches is instant. Use -d for safe deletion (prevents data loss), -D to force.",
  },
  {
    id: "checkout",
    category: "Branching",
    badgeClass: "badge-purple",
    title: "git checkout",
    desc: "Switch branches or restore files. Updates HEAD, index, and working tree to match target commit. Be careful — discards uncommitted changes in affected files.",
    code: `# Switch to existing branch
git checkout main

# Create and switch to new branch
git checkout -b feature-y

# Switch to previous branch
git checkout -

# Restore file from HEAD (discard changes)
git checkout -- file.txt

# Restore file from specific commit
git checkout abc123 file.txt

# Checkout remote branch
git checkout -b local-name origin/remote-branch

# Detached HEAD (checkout specific commit)
git checkout abc123`,
    note: "Detached HEAD means HEAD points to a commit, not a branch. Any new commits will be orphaned unless you create a branch. Modern alternative: git switch (for branches) and git restore (for files).",
  },
  {
    id: "switch",
    category: "Branching",
    badgeClass: "badge-purple",
    title: "git switch",
    desc: "Modern command to switch branches (Git 2.23+). Cleaner alternative to git checkout for branch operations. Doesn't restore files.",
    code: `# Switch to existing branch
git switch main

# Create and switch to new branch
git switch -c feature-z

# Switch to previous branch
git switch -

# Create branch from specific commit
git switch -c hotfix abc123

# Switch and discard uncommitted changes
git switch -f main`,
    note: "Introduced to separate branch-switching from file-restoring. Safer than checkout because it doesn't operate on files. Use git restore for file operations.",
  },
  {
    id: "merge",
    category: "Branching",
    badgeClass: "badge-purple",
    title: "git merge",
    desc: "Integrate changes from another branch. Creates a merge commit with two parents. Fast-forward if target is direct ancestor. Preserves complete history.",
    code: `# Merge feature branch into current branch
git merge feature-x

# Merge with custom message
git merge feature-x -m "Merge feature X"

# No fast-forward (always create merge commit)
git merge --no-ff feature-x

# Fast-forward only (fail if not possible)
git merge --ff-only feature-x

# Abort merge during conflicts
git merge --abort

# Continue merge after resolving conflicts
git merge --continue

# Merge with strategy
git merge -X theirs feature-x  # prefer their changes
git merge -X ours feature-x    # prefer our changes`,
    note: "Fast-forward: moves branch pointer forward (no merge commit). 3-way merge: creates merge commit. Use --no-ff to preserve feature branch history even when ff is possible.",
  },
  {
    id: "rebase",
    category: "Branching",
    badgeClass: "badge-purple",
    title: "git rebase",
    desc: "Reapply commits on top of another base. Creates linear history by moving entire branch. Rewrites commit history — never rebase pushed commits.",
    code: `# Rebase current branch onto main
git rebase main

# Interactive rebase (edit last 3 commits)
git rebase -i HEAD~3

# Continue after resolving conflicts
git rebase --continue

# Skip current commit
git rebase --skip

# Abort rebase
git rebase --abort

# Rebase onto different base
git rebase --onto main feature-a feature-b

# Preserve merge commits
git rebase --preserve-merges main`,
    note: "Golden rule: NEVER rebase commits that exist on public branches. Interactive rebase lets you squash, reword, reorder, or drop commits. Use for cleaning history before PR.",
  },
  {
    id: "cherry-pick",
    category: "Branching",
    badgeClass: "badge-purple",
    title: "git cherry-pick",
    desc: "Apply specific commit from one branch onto another. Creates new commit with same changes but different SHA. Useful for selective porting of fixes.",
    code: `# Apply single commit
git cherry-pick abc123

# Apply multiple commits
git cherry-pick abc123 def456

# Apply range of commits
git cherry-pick abc123..def456

# Cherry-pick without committing
git cherry-pick -n abc123

# Continue after resolving conflicts
git cherry-pick --continue

# Abort cherry-pick
git cherry-pick --abort`,
    note: "Creates duplicate commits with different SHAs. Use sparingly — prefer merge/rebase for regular workflow. Common use: port hotfix from release to main.",
  },

  // ─── REMOTE & COLLABORATION ───────────────────────────────────────────────
  {
    id: "remote",
    category: "Remote",
    badgeClass: "badge-yellow",
    title: "git remote",
    desc: "Manage remote repository connections. Remotes are named aliases for repository URLs. 'origin' is default name for cloned repo's source.",
    code: `# List remotes
git remote

# List remotes with URLs
git remote -v

# Add new remote
git remote add upstream https://github.com/original/repo.git

# Remove remote
git remote remove upstream

# Rename remote
git remote rename origin backup

# Change remote URL
git remote set-url origin https://github.com/user/new-repo.git

# Show remote details
git remote show origin`,
    note: "Common pattern: 'origin' = your fork, 'upstream' = original repo. Remotes are just bookmarks to URLs — no data transfer until fetch/pull/push.",
  },
  {
    id: "fetch",
    category: "Remote",
    badgeClass: "badge-yellow",
    title: "git fetch",
    desc: "Download objects and refs from remote repository. Updates remote-tracking branches but doesn't modify working tree. Safe operation — doesn't merge anything.",
    code: `# Fetch from origin
git fetch origin

# Fetch all remotes
git fetch --all

# Fetch specific branch
git fetch origin main

# Fetch and prune deleted remote branches
git fetch --prune

# Fetch tags
git fetch --tags

# Dry run (show what would be fetched)
git fetch --dry-run`,
    note: "fetch downloads data but doesn't integrate it — use merge or rebase after fetching. remote-tracking branches: origin/main, origin/feature-x (read-only local copies).",
  },
  {
    id: "pull",
    category: "Remote",
    badgeClass: "badge-yellow",
    title: "git pull",
    desc: "Fetch from remote and integrate into current branch. Equivalent to git fetch + git merge (or rebase). Updates working tree — can cause conflicts.",
    code: `# Pull from tracked remote branch
git pull

# Pull with rebase instead of merge
git pull --rebase

# Pull from specific remote/branch
git pull origin main

# Pull and fast-forward only (fail if ff not possible)
git pull --ff-only

# Pull all remote branches
git pull --all

# Pull with auto-stash (stash changes, pull, pop stash)
git pull --autostash`,
    note: "Default pull = fetch + merge. git pull --rebase = fetch + rebase (cleaner history). Configure default: git config pull.rebase true. Always pull before push.",
  },
  {
    id: "push",
    category: "Remote",
    badgeClass: "badge-yellow",
    title: "git push",
    desc: "Upload local commits to remote repository. Updates remote refs. Rejected if remote has commits you don't have locally (need pull first).",
    code: `# Push current branch to tracked remote
git push

# Push to specific remote/branch
git push origin main

# Push and set upstream tracking
git push -u origin feature-x

# Push all branches
git push --all

# Push tags
git push --tags

# Force push (overwrite remote history)
git push --force
# Safer force push (fails if remote changed)
git push --force-with-lease

# Delete remote branch
git push origin --delete feature-x`,
    note: "Never force push to shared branches (main, develop). --force-with-lease is safer — fails if remote changed since last fetch. Set upstream with -u for first push.",
  },

  // ─── INSPECTION & HISTORY ──────────────────────────────────────────────────
  {
    id: "log",
    category: "History",
    badgeClass: "badge-orange",
    title: "git log",
    desc: "Show commit history. Traverses commit graph from HEAD backwards. Essential for understanding project evolution and finding specific commits.",
    code: `# Basic log
git log

# One line per commit
git log --oneline

# Show last N commits
git log -5

# Show commits with diff
git log -p

# Show commits with stat summary
git log --stat

# Show graph (branch visualization)
git log --graph --oneline --all

# Filter by author
git log --author="John"

# Filter by date
git log --since="2 weeks ago"
git log --after="2024-01-01" --before="2024-12-31"

# Search commit messages
git log --grep="fix bug"

# Show commits affecting file
git log -- file.txt

# Pretty format
git log --pretty=format:"%h - %an, %ar : %s"`,
    note: "Use --oneline + --graph + --all for visual branch history. --pretty=format lets you customize output. Combine filters: --author + --since + --grep.",
  },
  {
    id: "show",
    category: "History",
    badgeClass: "badge-orange",
    title: "git show",
    desc: "Show details of Git objects: commits, tags, trees, blobs. Default shows latest commit with full diff. Essential for inspecting specific commits.",
    code: `# Show latest commit
git show

# Show specific commit
git show abc123

# Show specific file in commit
git show abc123:path/to/file.txt

# Show commit stats only
git show --stat abc123

# Show tag
git show v1.0.0

# Show branch tip
git show feature-x

# Show commit two back from HEAD
git show HEAD~2`,
    note: "Syntax: HEAD = latest commit, HEAD~ or HEAD~1 = previous, HEAD~2 = two back, HEAD^ = first parent (for merge commits). Use abc123:file.txt to view file at specific commit.",
  },
  {
    id: "blame",
    category: "History",
    badgeClass: "badge-orange",
    title: "git blame",
    desc: "Show what revision and author last modified each line of a file. Essential for understanding code history and finding when bugs were introduced.",
    code: `# Show line-by-line authorship
git blame file.txt

# Show with line numbers
git blame -L 10,20 file.txt

# Show with email
git blame -e file.txt

# Suppress author names
git blame -s file.txt

# Detect moved/copied lines
git blame -C file.txt

# Ignore whitespace changes
git blame -w file.txt`,
    note: "git blame shows who changed each line, not who wrote it originally. Use -C to detect lines copied from other files. Essential for code archaeology.",
  },
  {
    id: "reflog",
    category: "History",
    badgeClass: "badge-orange",
    title: "git reflog",
    desc: "Show reference log — history of where HEAD and branch tips pointed. Local only, not pushed. Essential for recovering lost commits after reset/rebase.",
    code: `# Show reflog
git reflog

# Show reflog for specific branch
git reflog feature-x

# Show last 10 entries
git reflog -10

# Recover lost commit
git reflog
# Find commit SHA, then:
git checkout abc123
git checkout -b recovery-branch`,
    note: "Reflog is your safety net — Git keeps references for ~90 days by default. Lost commits after hard reset? Check reflog. Not pushed to remote — local only.",
  },

  // ─── UNDO & RESET ──────────────────────────────────────────────────────────
  {
    id: "restore",
    category: "Undo",
    badgeClass: "badge-red",
    title: "git restore",
    desc: "Restore files to specific state (Git 2.23+). Modern replacement for checkout/reset file operations. Safer and more intuitive for file-level operations.",
    code: `# Restore file from HEAD (discard changes)
git restore file.txt

# Restore file from specific commit
git restore --source=abc123 file.txt

# Unstage file (opposite of git add)
git restore --staged file.txt

# Restore and unstage
git restore --staged --worktree file.txt

# Restore all files
git restore .

# Restore from previous commit
git restore --source=HEAD~1 file.txt`,
    note: "Cleaner than checkout for file operations. --staged = unstage, --worktree = discard changes, both = do both. Default is --worktree.",
  },
  {
    id: "reset",
    category: "Undo",
    badgeClass: "badge-red",
    title: "git reset",
    desc: "Reset current HEAD to specified state. Three modes: soft (keep changes staged), mixed (keep changes unstaged), hard (discard changes). Rewrites history.",
    code: `# Unstage all files (keep changes)
git reset

# Unstage specific file
git reset file.txt

# Move HEAD back 1 commit (keep changes staged)
git reset --soft HEAD~1

# Move HEAD back 1 commit (keep changes unstaged)
git reset --mixed HEAD~1
# or just:
git reset HEAD~1

# Move HEAD back 1 commit (DISCARD changes)
git reset --hard HEAD~1

# Reset to specific commit
git reset --hard abc123

# Reset branch to match remote
git reset --hard origin/main`,
    note: "DANGER: --hard destroys uncommitted work. Use reflog to recover. --soft useful for combining commits. Never reset public commits — use revert instead.",
  },
  {
    id: "revert",
    category: "Undo",
    badgeClass: "badge-red",
    title: "git revert",
    desc: "Create new commit that undoes changes from previous commit. Safe for public branches — doesn't rewrite history. Preserves complete audit trail.",
    code: `# Revert latest commit
git revert HEAD

# Revert specific commit
git revert abc123

# Revert without auto-commit
git revert -n abc123

# Revert multiple commits
git revert abc123..def456

# Continue after resolving conflicts
git revert --continue

# Abort revert
git revert --abort`,
    note: "Use revert for public branches, reset for local changes. Revert creates new commits — safe and transparent. Can revert reverts to redo changes.",
  },
  {
    id: "clean",
    category: "Undo",
    badgeClass: "badge-red",
    title: "git clean",
    desc: "Remove untracked files from working tree. Permanently deletes files — be careful! Use -n for dry run. Essential for getting back to pristine state.",
    code: `# Dry run (show what would be deleted)
git clean -n

# Remove untracked files
git clean -f

# Remove untracked files and directories
git clean -fd

# Remove ignored files too
git clean -fx

# Interactive mode
git clean -i

# Remove everything (files, dirs, ignored)
git clean -fdx`,
    note: "DANGER: Permanently deletes files! Always use -n first. -x removes .gitignore'd files (useful for build artifacts). Common: git clean -fdx for fresh build.",
  },

  // ─── STASHING ──────────────────────────────────────────────────────────────
  {
    id: "stash",
    category: "Stashing",
    badgeClass: "badge-cyan",
    title: "git stash",
    desc: "Temporarily save uncommitted changes without committing. Essential for switching branches with dirty working tree. Changes stored on stack — LIFO.",
    code: `# Stash changes
git stash

# Stash with message
git stash push -m "WIP: feature X"

# Stash including untracked files
git stash -u

# Stash including ignored files
git stash -a

# List stashes
git stash list

# Show stash contents
git stash show stash@{0}
git stash show -p stash@{0}  # with diff

# Apply latest stash (keep in stash)
git stash apply

# Apply specific stash
git stash apply stash@{2}

# Pop latest stash (apply + delete)
git stash pop

# Delete stash
git stash drop stash@{0}

# Clear all stashes
git stash clear

# Create branch from stash
git stash branch feature-x stash@{0}`,
    note: "Stashes are local only. stash@{0} = latest, stash@{1} = second, etc. Use pop for quick context switch, apply to keep stash. Stash untracked with -u.",
  },

  // ─── TAGGING ──────────────────────────────────────────────────────────────
  {
    id: "tag",
    category: "Tagging",
    badgeClass: "badge-pink",
    title: "git tag",
    desc: "Create, list, and verify tags. Tags are named references to specific commits. Lightweight tags = pointers. Annotated tags = objects with metadata.",
    code: `# List tags
git tag

# List tags matching pattern
git tag -l "v1.*"

# Create lightweight tag
git tag v1.0.0

# Create annotated tag (recommended)
git tag -a v1.0.0 -m "Release version 1.0.0"

# Tag specific commit
git tag -a v1.0.0 abc123 -m "Release"

# Show tag details
git show v1.0.0

# Push tag to remote
git push origin v1.0.0

# Push all tags
git push --tags

# Delete local tag
git tag -d v1.0.0

# Delete remote tag
git push origin --delete v1.0.0

# Checkout tag
git checkout v1.0.0`,
    note: "Use annotated tags for releases (-a flag). They contain tagger, date, message. Lightweight tags are just commit pointers. Tags must be explicitly pushed.",
  },

  // ─── ADVANCED ──────────────────────────────────────────────────────────────
  {
    id: "bisect",
    category: "Advanced",
    badgeClass: "badge-gray",
    title: "git bisect",
    desc: "Binary search to find commit that introduced a bug. Efficiently narrows down problematic commit by marking commits as good/bad. Automates bug hunting.",
    code: `# Start bisect
git bisect start

# Mark current commit as bad
git bisect bad

# Mark known good commit
git bisect good abc123

# Git checks out middle commit
# Test it, then mark:
git bisect good   # if test passes
git bisect bad    # if test fails

# Repeat until found

# End bisect
git bisect reset

# Automate with script
git bisect run npm test`,
    note: "Binary search: O(log n) efficiency. With 1000 commits between good/bad, bisect finds culprit in ~10 steps. Use 'git bisect run' to automate with test script.",
  },
  {
    id: "submodule",
    category: "Advanced",
    badgeClass: "badge-gray",
    title: "git submodule",
    desc: "Include external Git repository within your repository. Submodules are separate repos pinned to specific commits. Essential for dependency management.",
    code: `# Add submodule
git submodule add https://github.com/user/lib.git path/to/lib

# Initialize submodules after clone
git submodule init
git submodule update
# or:
git submodule update --init --recursive

# Update submodules to latest
git submodule update --remote

# Clone with submodules
git clone --recursive https://github.com/user/repo.git

# Remove submodule
git submodule deinit path/to/lib
git rm path/to/lib`,
    note: "Submodules are pinned to specific commits — not auto-updated. Parent repo stores submodule commit SHA. Use --recursive for nested submodules.",
  },
  {
    id: "worktree",
    category: "Advanced",
    badgeClass: "badge-gray",
    title: "git worktree",
    desc: "Manage multiple working trees attached to same repository. Work on multiple branches simultaneously without stashing or cloning. Each worktree has separate working directory.",
    code: `# List worktrees
git worktree list

# Add new worktree
git worktree add ../project-feature feature-branch

# Add new worktree with new branch
git worktree add -b new-feature ../project-new-feature

# Remove worktree
git worktree remove ../project-feature

# Prune stale worktree references
git worktree prune`,
    note: "Worktrees share .git directory but have separate working files. Useful for parallel development, testing, or reviewing PRs without switching branches.",
  },
  {
    id: "grep",
    category: "Advanced",
    badgeClass: "badge-gray",
    title: "git grep",
    desc: "Search for patterns in tracked files. Faster than regular grep because it only searches tracked files and uses Git's object database. Supports regex.",
    code: `# Search for pattern
git grep "TODO"

# Search with line numbers
git grep -n "TODO"

# Case-insensitive search
git grep -i "todo"

# Show count of matches per file
git grep -c "TODO"

# Search in specific commit
git grep "pattern" abc123

# Search with context lines
git grep -C 3 "pattern"

# AND search (both patterns)
git grep -e "TODO" --and -e "FIXME"

# OR search
git grep -e "TODO" -e "FIXME"`,
    note: "Much faster than grep for Git repos — only searches tracked files. Respects .gitignore. Use for finding todos, FIXMEs, or debugging patterns.",
  },

  // ─── COLLABORATION ────────────────────────────────────────────────────────
  {
    id: "request-pull",
    category: "Collaboration",
    badgeClass: "badge-teal",
    title: "git request-pull",
    desc: "Generate summary of pending changes for pull request. Creates human-readable summary of commits between branches. Used for email-based workflows.",
    code: `# Generate pull request summary
git request-pull origin/main https://github.com/user/fork.git feature-x

# With tag
git request-pull v1.0.0 https://github.com/user/fork.git main

# Specify commit range
git request-pull origin/main https://github.com/user/fork.git abc123`,
    note: "Primarily for email-based workflows. Modern platforms (GitHub, GitLab) have web-based PR interfaces. Output includes commit summary and diffstat.",
  },
  {
    id: "shortlog",
    category: "Collaboration",
    badgeClass: "badge-teal",
    title: "git shortlog",
    desc: "Summarize git log output grouped by author. Generate release notes or contributor lists. Essential for changelogs and team metrics.",
    code: `# Group commits by author
git shortlog

# Show commit counts only
git shortlog -sn

# Email format
git shortlog -e

# Specific range
git shortlog v1.0..v2.0

# Summary format
git shortlog --summary --numbered

# Include all branches
git shortlog --all`,
    note: "Perfect for generating CHANGELOG.md or contributor lists. -sn shows commit count per author. Use commit ranges for release notes: v1.0..v2.0.",
  },

  // ─── PLUMBING (LOW-LEVEL) ─────────────────────────────────────────────────
  {
    id: "hash-object",
    category: "Plumbing",
    badgeClass: "badge-dark",
    title: "git hash-object",
    desc: "Compute object ID and optionally create blob from file. Low-level command for understanding Git's content-addressable storage. SHA-1 hash of content.",
    code: `# Compute hash without storing
git hash-object file.txt

# Store object in database
git hash-object -w file.txt

# Hash stdin
echo "test" | git hash-object --stdin

# Hash and store from stdin
echo "test" | git hash-object -w --stdin`,
    note: "Git stores objects by SHA-1 hash of content. Same content = same hash (deduplication). Blobs, trees, commits, tags all stored this way.",
  },
  {
    id: "cat-file",
    category: "Plumbing",
    badgeClass: "badge-dark",
    title: "git cat-file",
    desc: "Provide content, type, or size information for repository objects. Essential for understanding Git's internal object model. Inspect blobs, trees, commits, tags.",
    code: `# Show object type
git cat-file -t abc123

# Show object size
git cat-file -s abc123

# Show object content
git cat-file -p abc123

# Pretty-print commit
git cat-file -p HEAD

# Show blob (file) content
git cat-file -p abc123:file.txt`,
    note: "Objects: blob (file content), tree (directory), commit (snapshot), tag (named ref). -p pretty-prints based on type. Essential for Git internals learning.",
  },

  // ─── ADVANCED WORKFLOWS ───────────────────────────────────────────────────
  {
    id: "filter-branch",
    category: "Advanced",
    badgeClass: "badge-gray",
    title: "git filter-branch",
    desc: "Rewrite Git history across entire repository. Remove sensitive data, change email addresses, or restructure history. Nuclear option — use with extreme caution.",
    code: `# Remove file from all history
git filter-branch --tree-filter 'rm -f passwords.txt' HEAD

# Change author email
git filter-branch --env-filter '
if [ "$GIT_AUTHOR_EMAIL" = "old@example.com" ]; then
  export GIT_AUTHOR_EMAIL="new@example.com"
fi' HEAD

# Remove directory from all history
git filter-branch --tree-filter 'rm -rf vendor/' HEAD

# Subdirectory filter (make subdir root)
git filter-branch --subdirectory-filter src/ HEAD`,
    note: "DANGER: Rewrites all commits — changes all SHAs. All collaborators must re-clone. Modern alternative: git-filter-repo. Last resort for sensitive data removal.",
  },
  {
    id: "archive",
    category: "Advanced",
    badgeClass: "badge-gray",
    title: "git archive",
    desc: "Create archive (tar, zip) of files from named tree. Export project without .git directory. Essential for distributing source releases.",
    code: `# Create zip archive
git archive --format=zip HEAD > release.zip

# Create tar.gz archive
git archive --format=tar HEAD | gzip > release.tar.gz

# Archive specific branch
git archive --format=zip main > main.zip

# Archive specific tag
git archive --format=zip v1.0.0 > v1.0.0.zip

# Archive with prefix (creates subdirectory)
git archive --prefix=project-1.0/ --format=zip HEAD > project-1.0.zip

# Archive specific directory
git archive HEAD src/ > src.tar`,
    note: "Archives don't include .git directory — perfect for distribution. Use tags for versioned releases. --prefix adds top-level directory in archive.",
  },

  // ─── PATCHING ──────────────────────────────────────────────────────────────
  {
    id: "format-patch",
    category: "Patching",
    badgeClass: "badge-purple",
    title: "git format-patch",
    desc: "Generate patch files from commits. Creates .patch files that can be emailed or shared. Essential for email-based Git workflows and kernel development.",
    code: `# Create patch for last commit
git format-patch -1 HEAD

# Create patch for last N commits
git format-patch -3 HEAD

# Create patch for range
git format-patch abc123..def456

# Create patch from branch
git format-patch main..feature-branch

# Output to specific directory
git format-patch -o patches/ HEAD~3..HEAD`,
    note: "Each commit becomes a separate .patch file. Filenames like 0001-commit-message.patch. Use with git am to apply patches. Common in open source projects.",
  },
  {
    id: "apply",
    category: "Patching",
    badgeClass: "badge-purple",
    title: "git apply",
    desc: "Apply a patch file to working tree. Doesn't create commits — just modifies files. Use for testing patches before committing.",
    code: `# Apply patch
git apply patch-file.patch

# Check if patch can be applied (dry run)
git apply --check patch-file.patch

# Show stats of what would change
git apply --stat patch-file.patch

# Apply patch with 3-way merge
git apply --3way patch-file.patch

# Reject hunks that don't apply
git apply --reject patch-file.patch`,
    note: "git apply modifies working tree but doesn't commit. Use git am to apply AND commit. --check is essential before applying to avoid partial application.",
  },
  {
    id: "am",
    category: "Patching",
    badgeClass: "badge-purple",
    title: "git am",
    desc: "Apply patches from mailbox. Reads patch files and creates commits with original author info and messages. Standard way to apply patch series.",
    code: `# Apply single patch
git am patch-file.patch

# Apply all patches in directory
git am patches/*.patch

# Continue after resolving conflicts
git am --continue

# Skip current patch
git am --skip

# Abort am process
git am --abort

# Apply with 3-way merge
git am --3way patch-file.patch`,
    note: "git am = 'apply mailbox'. Creates commits with original authorship. Standard in Linux kernel workflow. Preserves full commit metadata unlike git apply.",
  },

  // ─── .GITIGNORE & CLEANUP ──────────────────────────────────────────────────
  {
    id: "gitignore",
    category: "Cleanup",
    badgeClass: "badge-cyan",
    title: ".gitignore Operations",
    desc: "Manage ignored files and debug .gitignore rules. Check which patterns are ignoring files and remove accidentally tracked files.",
    code: `# Check why file is ignored
git check-ignore -v path/to/file

# Check multiple files
git check-ignore -v file1 file2 dir/*

# Untrack file but keep locally (after adding to .gitignore)
git rm --cached secret.env

# Untrack entire directory
git rm -r --cached logs/

# Untrack all files and re-add (apply .gitignore to tracked files)
git rm -r --cached .
git add .
git commit -m "Apply .gitignore rules"`,
    note: ".gitignore only affects untracked files. Use git rm --cached to untrack files without deleting them. Common mistake: forgetting to commit .gitignore changes.",
  },
  {
    id: "aliases",
    category: "Configuration",
    badgeClass: "badge-green",
    title: "Git Aliases",
    desc: "Create shortcuts for frequently used Git commands. Save time and reduce typing. Essential for efficient Git usage.",
    code: `# Status shorthand
git config --global alias.st status

# Checkout shorthand
git config --global alias.co checkout

# Branch shorthand
git config --global alias.br branch

# Commit shorthand
git config --global alias.ci commit

# Pretty log graph
git config --global alias.lg "log --oneline --graph --all --decorate"

# Undo last commit (soft reset)
git config --global alias.undo "reset --soft HEAD~1"

# Amend without editing message
git config --global alias.amend "commit --amend --no-edit"

# Show last commit
git config --global alias.last "log -1 HEAD"

# List aliases
git config --get-regexp alias

# Use alias
git st          # runs: git status
git lg          # runs: git log --oneline --graph --all --decorate`,
    note: "Aliases are stored in ~/.gitconfig. Can include shell commands with ! prefix. Popular aliases: st, co, br, ci, lg. Create workflow-specific aliases for complex commands.",
  },

  // ─── ADVANCED REBASE OPERATIONS ───────────────────────────────────────────
  {
    id: "interactive-rebase",
    category: "Advanced",
    badgeClass: "badge-gray",
    title: "Interactive Rebase Deep Dive",
    desc: "Advanced rebase operations: squash, fixup, reword, edit, drop commits. Essential for cleaning up history before merges. The most powerful Git tool for history editing.",
    code: `# Interactive rebase last 5 commits
git rebase -i HEAD~5

# In editor, change 'pick' to:
# - squash (s): merge into previous commit, edit message
# - fixup (f): merge into previous commit, discard message
# - reword (r): change commit message
# - edit (e): pause to amend commit
# - drop (d): remove commit entirely

# Example rebase todo list:
pick abc123 Add feature
fixup def456 Fix typo           # merges into previous
reword 789abc Update docs        # will prompt for new message
drop 012def Bad implementation   # removes commit

# Auto-fixup workflow (common pattern)
# Make a fixup commit
git commit --fixup abc123

# Auto-squash during rebase
git rebase -i --autosquash HEAD~10

# Reorder commits by changing line order in editor`,
    note: "Interactive rebase is the most powerful cleanup tool. Common: squashing 'WIP' commits, fixing typos, reordering. NEVER rebase public commits. Use --autosquash with --fixup for clean workflow.",
  },

  // ─── GIT WORKFLOWS ─────────────────────────────────────────────────────────
  {
    id: "workflows",
    category: "Workflows",
    badgeClass: "badge-teal",
    title: "Git Workflows & Strategies",
    desc: "Common Git collaboration patterns: Git Flow, Trunk-Based Development, Feature Branch, Forking. Understanding merge strategies and when to use each workflow.",
    code: `# ─── GIT FLOW ───
# Long-lived branches: main (production) and develop
# Feature branches off develop
# Release branches from develop → merge to main + develop
# Hotfix branches from main → merge to both

git checkout -b feature/login develop
# work...
git checkout develop
git merge --no-ff feature/login

# ─── TRUNK-BASED DEVELOPMENT ───
# Single main branch, short-lived feature branches
# Focus on small, frequent merges
# Feature flags for incomplete features

git checkout -b feature-x
# work for max 1-2 days
git push origin feature-x
# create PR → merge → delete branch

# ─── FEATURE BRANCH WORKFLOW ───
# Main branch is always deployable
# Each feature = separate branch
# Pull requests for code review

git checkout -b feature/user-auth
git push -u origin feature/user-auth
# work, commit, push, open PR

# ─── FORKING WORKFLOW ───
# Fork project to personal account
# Clone your fork
# Add upstream remote

git clone https://github.com/you/repo.git
git remote add upstream https://github.com/original/repo.git
git fetch upstream
git merge upstream/main

# ─── MERGE STRATEGIES ───
# Fast-forward: no merge commit (linear history)
git merge --ff-only feature

# No fast-forward: always create merge commit (preserve feature branch)
git merge --no-ff feature

# Squash: combine all commits into one
git merge --squash feature
git commit -m "Add complete feature"

# Rebase: linear history, rewrites commits
git rebase main feature`,
    note: "Git Flow = complex, multiple branches. Trunk-Based = simple, main focus. Feature Branch = middle ground. Forking = open source standard. Fast-forward = clean but loses branch context. No-ff = preserves history. Squash = clean but loses granularity. Rebase = clean linear history but rewrites commits.",
  },
  {
    id: "merge-strategies",
    category: "Workflows",
    badgeClass: "badge-teal",
    title: "Merge Strategies Explained",
    desc: "Deep dive into Git merge strategies: when to use fast-forward, no-ff, squash, or rebase. Critical for maintaining clean, understandable history.",
    code: `# ─── FAST-FORWARD (--ff) ───
# Default for direct-line branches
# No merge commit created
# Linear history like rebase

git merge feature-x              # fast-forward if possible
git log --oneline --graph
# * abc123 - Feature X commit 2
# * def456 - Feature X commit 1
# * 789abc - Previous main commit

# ─── NO FAST-FORWARD (--no-ff) ───
# Always creates merge commit
# Preserves feature branch context
# Recommended for feature branches

git merge --no-ff feature-y
git log --oneline --graph
# *   merge456 - Merge branch 'feature-y'
# |\\
# | * feature2 - Feature Y commit 2
# | * feature1 - Feature Y commit 1
# |/
# * main123 - Previous main commit

# ─── SQUASH (--squash) ───
# Combines all branch commits into one
# Clean main branch history
# Loses commit granularity

git merge --squash feature-z
git commit -m "Add feature Z (10 commits squashed)"
# Single commit on main, feature branch commits gone

# ─── REBASE vs MERGE ───
# Merge: preserves complete history, creates merge commits
git checkout main
git merge feature

# Rebase: linear history, no merge commits, rewrites SHAs
git checkout feature
git rebase main
git checkout main
git merge feature  # fast-forward

# ─── WHEN TO USE EACH ───
# Fast-forward: hotfixes, simple changes, already linear
# No-ff: feature branches, preserve context, team collaboration
# Squash: dirty branch history, many "WIP" commits, cleaner main
# Rebase: local branches only, before PR, linear preference`,
    note: "Company standards vary: GitHub defaults to no-ff merge commits. GitLab offers all options. Rebase = clean but NEVER on public branches. Squash = loses granularity but cleaner. No-ff = preserves context but busier graph. Choose based on team needs and project size.",
  },
];

export default function GitPage() {
  return (
    <div style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "40px" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            marginBottom: "10px",
            background: "linear-gradient(135deg, #f05032 0%, #ff6b35 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Git Command Reference
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#6c7086", marginBottom: "20px" }}>
          Complete technical guide to Git version control: 60+ commands with real-world usage patterns, workflows, and merge strategies
        </p>
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            fontSize: "0.9rem",
          }}
        >
          <span style={{ padding: "5px 12px", background: "#1e1e2e", color: "#cdd6f4", borderRadius: "5px" }}>
            🚀 Setup & Config
          </span>
          <span style={{ padding: "5px 12px", background: "#1e1e2e", color: "#cdd6f4", borderRadius: "5px" }}>
            🌿 Branching & Merging
          </span>
          <span style={{ padding: "5px 12px", background: "#1e1e2e", color: "#cdd6f4", borderRadius: "5px" }}>
            🔄 Remote & Sync
          </span>
          <span style={{ padding: "5px 12px", background: "#1e1e2e", color: "#cdd6f4", borderRadius: "5px" }}>
            📜 History & Inspection
          </span>
          <span style={{ padding: "5px 12px", background: "#1e1e2e", color: "#cdd6f4", borderRadius: "5px" }}>
            🔧 Advanced Workflows
          </span>
          <span style={{ padding: "5px 12px", background: "#1e1e2e", color: "#cdd6f4", borderRadius: "5px" }}>
            📦 Patching & Cleanup
          </span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        {gitCommands.map((cmd) => (
          <div
            key={cmd.id}
            id={cmd.id}
            style={{
              background: "#111118",
              border: "1px solid #1e1e2e",
              borderRadius: "8px",
              padding: "24px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <span
                className={cmd.badgeClass}
                style={{
                  padding: "4px 10px",
                  borderRadius: "4px",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  textTransform: "uppercase",
                }}
              >
                {cmd.category}
              </span>
              <h2
                style={{
                  fontSize: "1.5rem",
                  margin: 0,
                  fontFamily: "'Fira Code', 'Courier New', monospace",
                  color: "#f05032",
                }}
              >
                {cmd.title}
              </h2>
            </div>

            <p style={{ color: "#cdd6f4", lineHeight: "1.6", marginBottom: "16px" }}>
              {cmd.desc}
            </p>

            <div
              style={{
                background: "#1e1e1e",
                color: "#d4d4d4",
                padding: "16px",
                borderRadius: "6px",
                fontFamily: "'Fira Code', 'Courier New', monospace",
                fontSize: "0.9rem",
                overflowX: "auto",
                marginBottom: "12px",
              }}
            >
              <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{cmd.code}</pre>
            </div>

            <div
              style={{
                background: "rgba(249,226,175,0.15)",
                border: "1px solid rgba(249,226,175,0.3)",
                borderRadius: "6px",
                padding: "12px",
                fontSize: "0.9rem",
                lineHeight: "1.6",
              }}
            >
              <strong style={{ color: "#f9e2af" }}>💡 Technical Note:</strong>{" "}
              <span style={{ color: "#cdd6f4" }}>{cmd.note}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
