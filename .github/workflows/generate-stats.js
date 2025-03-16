name: Generate Contribution Stats
on:
  schedule:
    - cron: '0 0 * * *' # Runs daily at midnight
  workflow_dispatch:

jobs:
  generate-stats:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v4

      - name: Fetch GitHub Data
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          #!/bin/bash
          mkdir -p stats
          echo "Fetching repository data..."
          gh repo list --json nameWithOwner,url --limit 100 > stats/repos.json

      - name: Generate SVG
        uses: docker://node:20
        with:
          args: |
            /bin/bash -c "
            npm install -g github-contributions-api svg-pie-chart
            node generate-stats.js
            "

      - name: Commit SVG
        run: |
          git config --global user.name 'github-actions'
          git config --global user.email 'actions@github.com'
          git add stats/widget.svg
          git commit -m 'Update stats' || echo 'No changes'
          git push
