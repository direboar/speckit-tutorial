# Tasks: ToDoリスト基本機能

**Input**: Design documents from `/specs/001-todo-list-core/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/  
**Language**: This generated document MUST be written in Japanese.

**Tests**: 本機能では仕様上、主要ロジックの単体テストと主要フローの E2E テストを実施する。  
**Organization**: タスクはユーザーストーリーごとに独立実装・独立検証できるよう整理する。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 並列実行可能なタスク
- **[Story]**: 対応するユーザーストーリー (`[US1]`, `[US2]`, `[US3]`)
- すべての説明に対象ファイルパスを含める

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: プロジェクト初期化と開発基盤の用意

- [ ] T001 `package.json` を作成し、`vitest` と `playwright` を含む開発用依存および `npm scripts` を定義する
- [ ] T002 [P] `index.html`、`styles/main.css`、`src/app.js`、`src/modules/`、`src/utils/`、`tests/unit/`、`tests/e2e/` の基本構成を作成する
- [ ] T003 [P] `vitest.config.js` と `playwright.config.js` を作成し、単体テストと E2E テストの実行設定を定義する
- [ ] T004 [P] `specs/001-todo-list-core/quickstart.md` に対応する開発実行コマンドを `package.json` と設定ファイルへ反映する
- [ ] T005 [P] `README.md` または `package.json` コメント相当の運用メモで、日本語ドキュメント運用と主要コマンドを整理する

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: すべてのユーザーストーリーに共通する土台を整備する

**⚠️ CRITICAL**: このフェーズ完了前にユーザーストーリー実装へ入らない

- [ ] T006 `src/constants.js` に保存キー、保存スキーマ version、フィルタ値、入力制約、日時表示形式の定数を定義する
- [ ] T007 [P] `src/modules/todo-model.js` に ToDo アイテム生成、ID 採番、入力正規化、入力検証ロジックを実装する
- [ ] T008 [P] `src/modules/datetime-format.js` に ISO 文字列から `YYYY/MM/DD HH:SS` 表示へ整形する共通関数を実装する
- [ ] T009 [P] `src/modules/filter-state.js` にフィルタ判定と可視タスク抽出ロジックを実装する
- [ ] T010 `src/modules/storage.js` に `localStorage` の読込、保存、破損データ時フォールバック、version 管理を実装する
- [ ] T011 `src/utils/dom.js` に要素取得、イベント委譲、状態クラス切替などの共通 DOM 補助関数を実装する
- [ ] T012 `src/modules/todo-service.js` に一覧状態管理、追加、更新、削除、フィルタ切替、永続化連携の共通サービスを実装する
- [ ] T013 `tests/unit/storage.test.js`、`tests/unit/datetime-format.test.js`、`tests/unit/filter-state.test.js`、`tests/unit/todo-service.test.js` に基盤ロジックの単体テストを追加する

**Checkpoint**: 共通ロジックと保存基盤が整い、各ストーリー実装へ進める状態

---

## Phase 3: User Story 1 - タスクを追加する (Priority: P1) 🎯 MVP

**Goal**: タスク入力、追加、登録日時表示、再読み込み後の保持を成立させる

**Independent Test**: タスク未登録状態から 1 件以上追加し、一覧表示と登録日時表示が行われ、再読み込み後も保持されることを確認する

### Tests for User Story 1

- [ ] T014 [P] [US1] `tests/unit/todo-service.test.js` にタスク追加と保存処理の単体テストを追加する
- [ ] T015 [P] [US1] `tests/e2e/todo-app.spec.js` にタスク追加から再読み込み後保持までの E2E テストを追加する

### Implementation for User Story 1

- [ ] T016 [P] [US1] `index.html` にアプリ見出し、タスク追加フォーム、エラー表示領域、タスクリスト領域の基本マークアップを実装する
- [ ] T017 [P] [US1] `styles/main.css` に追加フォーム、一覧、空状態、登録日時表示の基本スタイルを実装する
- [ ] T018 [US1] `src/modules/todo-view.js` にタスク行描画、登録日時表示、空状態表示、エラー表示を実装する
- [ ] T019 [US1] `src/app.js` に初期表示、追加フォーム送信、一覧再描画、保存済みデータ読み込みを接続する
- [ ] T020 [US1] `index.html`、`styles/main.css`、`src/modules/todo-view.js` で追加フォームとエラー表示のアクセシビリティ属性を整える

**Checkpoint**: User Story 1 単体で追加機能と再読み込み保持が動作する

---

## Phase 4: User Story 2 - タスクの状態を管理する (Priority: P2)

**Goal**: 完了切替と未完了切替を画面と保存状態に反映できるようにする

**Independent Test**: 既存タスク 1 件に対して完了と未完了の切替を行い、表示状態と保存状態が切り替わることを確認する

### Tests for User Story 2

- [ ] T021 [P] [US2] `tests/unit/todo-service.test.js` に完了状態の切替ロジックの単体テストを追加する
- [ ] T022 [P] [US2] `tests/e2e/todo-app.spec.js` に完了切替と再読み込み後保持の E2E テストを追加する

### Implementation for User Story 2

- [ ] T023 [P] [US2] `src/modules/todo-view.js` に完了チェックボックス、状態ラベル、完了時の視覚表現を追加する
- [ ] T024 [US2] `src/modules/todo-service.js` に完了状態更新と保存反映ロジックを追加する
- [ ] T025 [US2] `src/app.js` に完了切替イベント処理と一覧再描画を接続する
- [ ] T026 [US2] `styles/main.css` に完了状態の非色依存表現、フォーカス表示、操作要素の視認性を追加する

**Checkpoint**: User Story 1 と独立して、完了状態管理が正しく検証可能になる

---

## Phase 5: User Story 3 - タスクを整理して見る (Priority: P3)

**Goal**: タスク削除とフィルタ切替により一覧を整理できるようにする

**Independent Test**: 複数タスクを用意し、削除とフィルタ切替を行って表示対象が期待どおり変化することを確認する

### Tests for User Story 3

- [ ] T027 [P] [US3] `tests/unit/todo-service.test.js` と `tests/unit/filter-state.test.js` に削除およびフィルタ判定の単体テストを追加する
- [ ] T028 [P] [US3] `tests/e2e/todo-app.spec.js` に削除とフィルタ切替の E2E テストを追加する

### Implementation for User Story 3

- [ ] T029 [P] [US3] `index.html` に `すべて`、`未完了`、`完了済み` のフィルタ操作 UI を追加する
- [ ] T030 [P] [US3] `src/modules/todo-view.js` に削除ボタン、フィルタ UI、フィルタ別空状態表示を実装する
- [ ] T031 [US3] `src/modules/todo-service.js` に削除処理とアクティブフィルタ更新処理を追加する
- [ ] T032 [US3] `src/app.js` に削除イベント、フィルタ切替イベント、フィルタ状態の再描画を接続する
- [ ] T033 [US3] `styles/main.css` にフィルタ選択状態、削除操作、空状態表示のスタイルを追加する

**Checkpoint**: 全ユーザーストーリーが独立して機能し、整理操作を含めて検証可能になる

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 全体品質と横断的要件の仕上げ

- [ ] T034 [P] `tests/e2e/todo-app.spec.js` に主要フロー全体の回帰確認ケースを整理し、重複ケースをリファクタリングする
- [ ] T035 [P] `styles/main.css` と `index.html` でモバイル幅・デスクトップ幅のレスポンシブ調整を完了する
- [ ] T036 [P] `index.html`、`src/modules/todo-view.js`、`styles/main.css` でキーボード操作、フォーカス可視性、アクセシブルネームを最終確認し不足分を修正する
- [ ] T037 `src/modules/storage.js` と `src/modules/todo-service.js` で破損データ、空データ、保存後互換性の最終確認を行う
- [ ] T038 [P] `specs/001-todo-list-core/quickstart.md` と `specs/001-todo-list-core/contracts/ui-contract.md` を実装結果に合わせて更新する
- [ ] T039 `package.json` のスクリプトを用いて単体テスト、E2E テスト、手動確認観点を実施し、結果を確認する

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1: Setup**: 依存なしで開始できる
- **Phase 2: Foundational**: Phase 1 完了後に実施し、全ユーザーストーリーをブロックする
- **Phase 3-5: User Stories**: Phase 2 完了後に開始できる
- **Phase 6: Polish**: 実装対象とするユーザーストーリー完了後に実施する

### User Story Dependencies

- **US1 (P1)**: Foundation 完了後すぐに着手でき、MVP となる
- **US2 (P2)**: Foundation 完了後に着手できるが、UI 描画の一部は US1 の成果を前提にする
- **US3 (P3)**: Foundation 完了後に着手できるが、一覧 UI の基本構造は US1 を前提にする

### Within Each User Story

- 単体テストと E2E テストを先に追加し、失敗を確認してから実装する
- 表示部品の追加後にサービス層とイベント接続を行う
- ストーリー完了後に独立テスト基準を満たしているか確認する

### Parallel Opportunities

- Setup では `T002` `T003` `T004` `T005` を並列化できる
- Foundation では `T007` `T008` `T009` `T011` を並列化できる
- US1 では `T014` `T015`、`T016` `T017` を並列化できる
- US2 では `T021` `T022`、`T023` `T026` を並列化できる
- US3 では `T027` `T028`、`T029` `T030` `T033` を並列化できる

---

## Parallel Example: User Story 1

```bash
# Tests
Task: "tests/unit/todo-service.test.js にタスク追加と保存処理の単体テストを追加する"
Task: "tests/e2e/todo-app.spec.js にタスク追加から再読み込み後保持までの E2E テストを追加する"

# UI base
Task: "index.html にアプリ見出し、タスク追加フォーム、エラー表示領域、タスクリスト領域の基本マークアップを実装する"
Task: "styles/main.css に追加フォーム、一覧、空状態、登録日時表示の基本スタイルを実装する"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1 の Setup を完了する
2. Phase 2 の Foundation を完了する
3. Phase 3 の User Story 1 を完了する
4. User Story 1 の独立テストを実施する
5. MVP として確認する

### Incremental Delivery

1. Setup + Foundation を完了する
2. US1 を追加して独立確認する
3. US2 を追加して独立確認する
4. US3 を追加して独立確認する
5. 最後に Polish を実施する

### Parallel Team Strategy

1. Setup と Foundation を全員で完了する
2. Foundation 完了後、担当を分けて US1、US2、US3 を進める
3. 最後に横断確認とテストをまとめて行う

---

## Notes

- `[P]` 付きタスクは、別ファイルで依存が衝突しない前提で並列化できる
- ユーザーストーリー単位で完了判定できるよう、各フェーズに独立テスト基準を持たせている
- `master` ブランチ上のため Spec Kit の自動前提チェックは通らないが、`specs/001-todo-list-core/` を正としてタスクを生成している
