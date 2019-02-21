workflow "Install, Build, Copy files, Pack and Publish" {
  on = "push"
  resolves = ["Publish"]
}

action "Install" {
  uses = "actions/npm@master"
  args = "install"
}

action "Build" {
  needs = "Install"
  uses = "actions/npm@master"
  args = "run build_lib"
}

action "Copy files" {
  needs = "Build"
  uses = "actions/npm@master"
  args = "run copy-files"
}

action "Pack" {
  needs = "Copy files"
  uses = "actions/npm@master"
  args = "run npm_pack"
}

# Filter for a new tag
action "Tag" {
  needs = "Pack"
  uses = "actions/bin/filter@master"
  args = "tag"
}

action "Publish" {
  needs = "Tag"
  uses = "actions/npm@master"
  args = "run npm_publish"
  secrets = ["NPM_AUTH_TOKEN"]
}
