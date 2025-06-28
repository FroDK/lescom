#!/bin/bash

# compush.sh - Logically split uncommitted changes, commit with meaningful message, and push

echo "🚀 Starting compush workflow..."

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

# Check if there are any changes to commit
if git diff --quiet && git diff --cached --quiet; then
    echo "ℹ️  No changes to commit"
    exit 0
fi

echo "📊 Analyzing uncommitted changes..."

# Show current status
git status --porcelain

echo ""
echo "📝 Staged changes:"
git diff --cached --name-only

echo ""
echo "🔄 Unstaged changes:"
git diff --name-only

echo ""
echo "❓ New/untracked files:"
git ls-files --others --exclude-standard

echo ""
echo "🤖 Invoking Claude to analyze and commit changes..."

# Create a temporary prompt file
PROMPT_FILE=$(mktemp)
cat > "$PROMPT_FILE" << 'EOF'
Logically split uncommitted changes. Write a meaningful message and commit changes. Then push all.

Please analyze the current git state and:
1. Logically group related changes together
2. Create meaningful commit messages following conventional commit format
3. Stage and commit each logical group separately
4. Push all commits when done

Focus on:
- Grouping related functionality changes
- Separating feature additions from bug fixes
- Keeping refactoring separate from new features
- Writing clear, descriptive commit messages
EOF

# Call Claude Code with the prompt
if command -v claude &> /dev/null; then
    claude < "$PROMPT_FILE"
elif command -v code &> /dev/null && code --list-extensions | grep -q "anthropic.claude"; then
    # If using Claude in VS Code
    echo "Please run this prompt in Claude Code:"
    cat "$PROMPT_FILE"
else
    echo "⚠️  Claude Code not found. Please run this prompt manually:"
    echo ""
    cat "$PROMPT_FILE"
fi

# Clean up
rm "$PROMPT_FILE"

echo ""
echo "✅ Compush workflow completed!"