---
title: homebrew-caskにないアプリは自分で追加しよう
path: /homebrew-caskにないアプリは自分で追加しよう/
date: 2018-11-23
category: "magcho"
tags:
 - mac
 - homebrew
 - homebrew-cask
draft: false
description: "" 
layout: post
---
## Homebrew-cask

皆さんこんにちは、magchoです。全く更新していなかったNekspress blogですがちょこちょこと書いていこうかと思います。

homebrew caskはmacのGUIアプリケーションをインストールするためのコマンドラインツールです。Ubuntuでいうaptみたいなものです。aptでは基本的に開発者がリポジトリを公開して、インストールできるようにしていますがCaskではGithub上にリポジトリがあり、そのアプリの開発者でなくても登録ができます。

今まではブラウザからダウンロードしていたアプリがあるのなら、Caskに登録してインストールを自動化しましょう！


## Caskに追加してみる

1. homebrewを更新し、作業中は自動更新を止める
   
   まず`brew update`で更新をかけておきます、これでCask含めbrew本体も更新されます。
   
   次に、homebrewはCaskを自動更新する仕様なので作業中はこれを止めておきます。
   ```
   export HOMEBREW_NO_AUTO_UPDATE=1
   ```
   セッション中にしか効かないので、ターミナルなどを開き直した場合はもう一度実行してください。
   
1. Caskに追加したいアプリケーションをインストールしておく
   
   今までと同じようにブラウザでインストーラーなどをダウンロードし、インストールします。後々使うのでダウンロードしたファイルを消さないようにしましょう。
1. github上で[homebrew-cask](https://github.com/Homebrew/homebrew-cask)をforkする
1. local上のhomebrewディレクトリのgitにforkしたリポジトリを追加する
   ```language:bash
   github_user='<my-github-username>'
   cd "$(brew --repository)"/Library/Taps/Homebrew/homebrew-cask
   git remote add "${github_user}" "https://github.com/${github_user}/homebrew-cask"
   ```
1. Cask名を決める
   
   いわゆる`brew cask install 〇〇`のところの名前です。命名規則があるようなのですがこれを自動で決めてくれるコマンドがあります。
   ```
   "$(brew --repository)/Library/Taps/Homebrew/homebrew-cask/developer/bin/generate_cask_token" '/Applications/〇〇.app'
   ```
1. Caskの定義ファイルを作る
   
   定義ファイルは.rbファイルのテキストです。Stanzasという記法らしいです。これもコマンドにて雛形を作ってくれます。
   ```
   brew cask create {Cask名}
   ```
1. 定義ファイルを書く
   
   [homebrew-caskの仕様](https://github.com/Homebrew/homebrew-cask/blob/master/doc/development/adding_a_cask.md#cask-stanzas)などを読みながら雛形の空欄を埋めていきます。
   
   ちなみに`SHA-256`の部分は.appではなくダウンロードした.zipや.dmgなどのファイルのハッシュ値です。これは以下のコマンドで確認できます。ダウンロードフォルダにファイルが残っていると思うので以下のような感じで確認できます。
   ```
   shasum -a 256 "~/Downloads/〇〇.zip"
   ```
   
   また、urlにバージョンの数字などが含まれる場合は変数としておくことでバージョンアップ時に定義ファイルを自動更新できるので変更しておきましょう。変数は`#{version}`で置き換えることができます。ここで注意したいのは先のコマンドで作った雛形ではシングルクオートですが、**変数を含める際にはダブルクオートでなければなりません。**
   ```
   Before url 'https://example.com/app-v1.0.1.zip'
   After  url "https://example.com/app-v#{version}.zip"
   ```
   
   nameの部分にはスペースを含めることができます。大文字小文字やスペース位置などを正確に入力しておきましょう。
   
   appには`/Applications`にインストールされているファイル名を入力しておきます。

1. 書き上げた定義ファイルの確認
   
   まず実際にインストールできるか確認しましょう。手順の中ですでにPC内にインストール済みなので、アンインストールするか、`-f`オプションで上書きしましょう。
   ```
   brew cask install -f 〇〇
   ```
   インストール後動作に問題がなければOKです。
   
   定義ファイルのシンタックスチェックや、必要事項の記入漏れなどを確認・自動修正してくれるコマンドが備えれらています。
   
   
   ```
   brew cask audit 〇〇 --download
   brew cask style Casks/〇〇.rb
   
   brew cask style Casks/〇〇.rb --fix   // <- 自動修正してくれます。
   ```
   
   これにて定義ファイルが完成です。次はPRをしていきます。
   
1. 変更をcommit・pushする
   
   コミットメッセージにもガイドラインが決まっています。
   > The first line is commit summary, 50 characters or less,<br>
   > Followed by an empty line,<br>
   > Followed by an explanation of the commit, wrapped to 72 characters.

   [ここ](https://github.com/Homebrew/homebrew-cask/blob/master/doc/development/adding_a_cask.md#commit-messages)には例とかもっと詳しいガイドラインの紹介とかがあります
   そしてforkした自分のリポジトリにpushします
   ```
   git push <my-github-username> {branch名}
   ```
   
1. プルリクエストを出す
   
   普通にGithub上でプルリクを発行します。メッセージに自動で必要項目の雛形が出てくるので記入、チェックを入れてPRしましょう。1~2日ぐらいでレビュー or マージしてくれます。みなさん優しくて不都合があっても教えてくれます。
   
   これで晴れてhomebrewのコントリビュータになれました！！ヤッタネ！！

1. 最後に作業した環境を戻しておきます
  
   ```
   cd "$(brew --repository)"/Library/Taps/Homebrew/homebrew-cask
   git checkout master
   ```
