---
title: Nekspress blogをつくった
date: 2018-11-23
layout: post
category: "magcho"
draft: false
tags:
 - gatsbyjs
 - web
description: ""
---

この度Nekspressブログを立ち上げました。とりあえず立ち上げただけなので既存のテーマを適当にいじって公開しただけですが、NekspressのHPをつくったあとにいい感じのテーマに作り変えようと思います。

今回は本ブログの技術スタック周りのお話。

ブログの要件は
 - 複数人が寄稿できるようにすること
 - 記事の寄稿から公開までを自動で行う
 - サーバー代はかけたくない
 - 寄稿は直接だけではなく、個人の既存のブログから取得することもできる

これくらいならWordPressなどのCMSで実現できると思うんですが、自分個人的にWPを触りたくないというのと最近何かと流行りのJAMStackで行こうと思いgatsby.js + GitLab + Netlifyで構築しています。
