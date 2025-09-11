{ pkgs ? import (builtins.fetchTarball https://github.com/nixos/nixpkgs/archive/f5d7a1827d44081bf109ed213b6b2e735a33136d.tar.gz) {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.bashInteractive
    pkgs.dnscontrol
  ];
}
