# 実装計画: ToDoリスト基本機能

**Branch**: `master` | **Date**: 2026-05-07 | **Spec**: [spec.md](/home/minokuba/codex/project/tutorial/specs/001-todo-list-core/spec.md)  
**Input**: `/specs/001-todo-list-core/spec.md` の機能仕様

**Note**: この文書は `/speckit-plan` により生成された実装計画書である。  
**Language**: この文書は日本語で記述する。

## Summary

単一ブラウザ内で動作する ToDo リストアプリを、HTML/CSS/バニラ JavaScript だけで
構築する。タスクの追加、完了切替、削除、フィルタ表示、`localStorage` による
永続化、登録日時の表示を対象とする。実装は ES Modules に分割し、主要ロジックは
単体テストで、主要ユーザーフローは限定的な E2E テストで検証する。

## Technical Context

**Language/Version**: HTML5、CSS3、JavaScript ES2023、Node.js 22 系（開発用ツール実行環境）  
**Primary Dependencies**: 実行時依存なし、開発時依存として `vitest`、`playwright`、`@playwright/test`  
**Storage**: ブラウザ `localStorage`  
**Testing**: `vitest` による単体テスト、`playwright` による主要フロー E2E テスト  
**Target Platform**: モダンブラウザ最新版相当（Chrome、Edge、Firefox、Safari の主要 2 世代以内）  
**Project Type**: フロントエンドのみの静的 Web アプリ  
**Performance Goals**: 初回表示 1 秒以内、100 件程度の ToDo を保持しても主要操作が体感遅延なく完了する  
**Constraints**: オフライン利用可能、バックエンド非依存、横スクロール不要、キーボード操作可能、登録日時は `YYYY/MM/DD HH:SS` 形式  
**Scale/Scope**: 単一ユーザー、単一ブラウザ、ToDo 数は数百件までを想定

## Constitution Check

*GATE: Phase 0 開始前に確認し、Phase 1 完了後に再確認する。*

- 合格。UI は単一画面で主要操作を完結させる構成とし、不要な画面分割を行わない。
- 合格。永続化は `localStorage` に限定し、保存データのバージョン識別子を持たせる。
- 合格。アプリ本体はバニラ JavaScript とブラウザ標準 API のみで実装する。
- 合格。モバイルとデスクトップで同一 HTML 構造を使い、CSS でレスポンシブ対応する。
- 合格。セマンティック HTML、可視フォーカス、色以外の状態表現を計画に含める。
- 合格。計画書および生成成果物は日本語で記述する。

## Project Structure

### Documentation

```text
specs/001-todo-list-core/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui-contract.md
└── tasks.md
```

### Source Code

```text
index.html
styles/
└── main.css
src/
├── app.js
├── constants.js
├── modules/
│   ├── storage.js
│   ├── todo-model.js
│   ├── todo-service.js
│   ├── todo-view.js
│   ├── filter-state.js
│   └── datetime-format.js
└── utils/
    └── dom.js
tests/
├── unit/
│   ├── todo-service.test.js
│   ├── storage.test.js
│   ├── filter-state.test.js
│   └── datetime-format.test.js
└── e2e/
    └── todo-app.spec.js
```

**Structure Decision**: 単一の静的 Web アプリ構成を採用する。HTML は 1 画面、
ロジックは `src/modules/` に分離し、テストは `tests/unit/` と `tests/e2e/` に分ける。

## Phase 0 Research Summary

- 詳細は [research.md](/home/minokuba/codex/project/tutorial/specs/001-todo-list-core/research.md) を参照。
- 実行時依存を持たず、開発用ツールのみを追加する。
- 登録日時は保存時に ISO 文字列として保持し、表示時に `YYYY/MM/DD HH:SS` へ整形する。
- E2E は全面網羅ではなく、追加、完了切替、削除、フィルタ、再読み込み保持のみを対象にする。

## Phase 1 Design Summary

- データモデルは [data-model.md](/home/minokuba/codex/project/tutorial/specs/001-todo-list-core/data-model.md) に定義する。
- UI の利用契約は [contracts/ui-contract.md](/home/minokuba/codex/project/tutorial/specs/001-todo-list-core/contracts/ui-contract.md) に定義する。
- 実行手順と確認観点は [quickstart.md](/home/minokuba/codex/project/tutorial/specs/001-todo-list-core/quickstart.md) にまとめる。

## Phase 2 実装タスクの分解方針

1. 初期セットアップ
   `index.html`、`styles/main.css`、`src/app.js`、テスト実行設定、npm scripts を用意する。
2. ドメインと永続化
   ToDo モデル、入力検証、ID 採番、保存スキーマ、`localStorage` 入出力、破損データ時の復旧方針を実装する。
3. UI 描画と操作
   一覧描画、追加フォーム、完了切替、削除、空状態表示、登録日時表示、フィルタ切替を実装する。
4. レスポンシブとアクセシビリティ
   モバイル優先レイアウト、キーボード操作、フォーカス表示、状態ラベル、エラー表示を整備する。
5. 自動テスト
   主要ロジックの単体テストと、主要フローを対象とした E2E テストを実装する。
6. 最終確認
   再読み込み保持、表示形式、レスポンシブ、アクセシビリティ、保存データ互換性を確認する。

## Post-Design Constitution Check

- 合格。設計後も単一画面のシンプルな操作モデルを維持している。
- 合格。保存先は `localStorage` のみで、保存データバージョンを扱う設計にした。
- 合格。ランタイム依存は追加せず、テスト専用ツールのみを導入する。
- 合格。レスポンシブとアクセシビリティを実装タスクに明示的に含めた。
- 合格。設計成果物はすべて日本語で整備した。

## Complexity Tracking

現時点で憲章違反に該当する複雑化はない。
