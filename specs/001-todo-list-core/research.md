# 調査メモ: ToDoリスト基本機能

## Decision 1: 実装は静的 Web アプリとして構成する

**Decision**: `index.html` を起点とする静的な単一画面アプリとして構築し、UI ロジックは
ES Modules で分割する。  
**Rationale**: バックエンドやビルド前提を持たないため、最小構成で要件を満たせる。
単一画面で追加、完了切替、削除、フィルタ、日時表示を完結でき、憲章の
「シンプルで直感的な UI」と整合する。  
**Alternatives considered**:
- SPA フレームワーク導入: 憲章違反であり、今回の規模では過剰。
- 複数 HTML 画面へ分割: 操作導線が複雑化し、要件上の利点がない。

## Decision 2: 永続化は `localStorage` に保存スキーマ付きで実装する

**Decision**: `localStorage` に `version`、`todos`、`activeFilter` を含む JSON を保存する。  
**Rationale**: 再読み込み後の状態保持が必須であり、単一ブラウザ前提の要件と一致する。
将来の保存形式変更に備え、バージョンを先に持たせておくことで移行余地を確保する。  
**Alternatives considered**:
- `sessionStorage`: 再読み込みやタブ終了後の保持要件に弱い。
- IndexedDB: 今回のデータ量と操作内容に対して複雑すぎる。

## Decision 3: 登録日時は内部保存と表示形式を分離する

**Decision**: 登録日時は ISO 8601 文字列で保存し、表示時のみ `YYYY/MM/DD HH:SS` に整形する。  
**Rationale**: 内部保存を標準的な日時表現にしておくと比較・変換・将来拡張が容易になる。
表示要件を変更しても保存データを壊さずに済む。  
**Alternatives considered**:
- 表示用文字列をそのまま保存: 比較や将来の表示変更に不利。
- UNIX タイムスタンプ保存: 実装上は可能だが、今回の可読性では ISO 文字列のほうが扱いやすい。

## Decision 4: テストは単体テスト中心、E2E は主要フローに限定する

**Decision**: 単体テストでロジックを厚く検証し、E2E は追加、完了切替、削除、
フィルタ切替、再読み込み保持のみを対象とする。  
**Rationale**: 小規模アプリでは、保存・整形・フィルタのロジックを単体で高速に回しつつ、
ブラウザ実動作の結合点だけ E2E で押さえるのが最も効率的である。  
**Alternatives considered**:
- 単体テストのみ: 実ブラウザでの永続化連携や画面反映の抜けが残る。
- 広範囲 E2E: 費用対効果が低く、将来の保守コストが高い。

## Decision 5: テストツールは開発用依存に限定して導入する

**Decision**: 単体テストに `vitest`、E2E に `playwright` を採用する。  
**Rationale**: どちらもランタイム依存を増やさず、ブラウザアプリのロジック検証と
UI フロー検証を分離して扱える。  
**Alternatives considered**:
- Jest + Playwright: 可能だが、ES Modules 前提では `vitest` のほうが構成を軽く保ちやすい。
- 手動テスト中心: 回帰検知が弱く、clarify で決めたテスト方針に不足する。

## Decision 6: UI 契約を文書化して実装タスクへ接続する

**Decision**: API 契約の代わりに、画面上の要素、状態、操作結果を `contracts/ui-contract.md`
として定義する。  
**Rationale**: 外部 API を持たないアプリでも、UI が事実上の利用契約になる。
表示形式やエラー条件を先に固定しておくと、実装とテストのズレを防げる。  
**Alternatives considered**:
- 契約文書を作らない: UI 実装とテストの期待値が分散する。
- 画面モック画像で管理する: 文字ベースの差分管理がしづらい。

