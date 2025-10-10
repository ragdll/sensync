# SenSync

**SenSync** は、FPSゲーム間でマウス感度を簡単に同期できるWebアプリケーションです。FOV（視野角）の違いも考慮した高精度な変換が可能です。

🌐 **デモサイト**: [https://YOUR_USERNAME.github.io/sensync/](https://YOUR_USERNAME.github.io/sensync/)

![SenSync Screenshot](https://via.placeholder.com/800x400?text=SenSync+Screenshot)

## ✨ 特徴

- 🎮 **複数のFPSゲームに対応**: VALORANT、Apex Legends、CS2、Overwatch 2、Fortnite など
- 🔄 **正確な感度変換**: 各ゲームのYaw値を使用した高精度な変換
- 👁️ **FOV調整対応**: 視野角の違いを考慮した感度計算（Monitor Distance方式）
- 📊 **詳細な情報表示**: eDPI、360度回転距離（cm/360）も同時に表示
- ➕ **カスタムゲーム追加**: 任意のゲームをYaw値とともに追加可能
- 🌍 **多言語対応**: 日本語・英語に対応
- 🎨 **モダンなUI**: TailwindCSSを使用した美しいインターフェース
- 🔒 **セキュア**: すべての入力値を安全な範囲内に制限

## 🚀 使い方

### オンライン版

デモサイトにアクセスするだけで、すぐに使用できます！

1. マウスのDPIを入力
2. 現在使用しているゲームと感度を選択
3. 変換したいゲームを選択すると、自動的に感度が計算されます
4. （オプション）FOV値を入力すると、視野角を考慮した感度も表示されます

### ローカルで実行

```bash
# リポジトリをクローン
git clone https://github.com/YOUR_USERNAME/sensync.git
cd sensync

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev

# ブラウザで http://localhost:5173 を開く
```

## 🛠️ 技術スタック

- **React 18** - UIライブラリ
- **Vite** - ビルドツール
- **TailwindCSS** - スタイリング
- **Lucide React** - アイコン
- **GitHub Pages** - ホスティング

## 📦 デプロイ

### 自動デプロイ（GitHub Actions）

`main`ブランチにプッシュすると、自動的にGitHub Pagesにデプロイされます。

```bash
git add .
git commit -m "Update"
git push origin main
```

### 手動デプロイ（gh-pages）

```bash
npm run deploy
```

## 🎯 対応ゲーム

### デフォルト対応ゲーム

- VALORANT (Yaw: 0.07)
- Apex Legends (Yaw: 0.022)
- CS2 / CS:GO (Yaw: 0.022)
- Overwatch 2 (Yaw: 0.0066)
- Fortnite (Yaw: 0.5555)
- Call of Duty (Yaw: 0.0066)
- PUBG (Yaw: 0.0066)
- Rainbow Six Siege (Yaw: 0.00572958)

### カスタムゲームの追加

1. 「カスタムゲームを追加」ボタンをクリック
2. ゲーム名を入力
3. 「Yaw値を検索する」でGoogle検索を利用してYaw値を見つける
4. Yaw値を入力して追加

## 🧮 計算式

### 感度変換
```
変換後の感度 = (元の感度 × 元のYaw値) / 変換先のYaw値
```

### FOV調整（Monitor Distance方式）
```
FOV調整後の感度 = 変換後の感度 × (tan(変換先FOV/2) / tan(元のFOV/2))
```

### eDPI
```
eDPI = DPI × ゲーム内感度
```

### 360度回転距離（cm/360）
```
cm/360 = (360 / (感度 × DPI × Yaw値)) × 2.54
```

## 📝 開発

### プロジェクト構造

```
sensync/
├── src/
│   ├── App.jsx          # メインアプリケーション
│   ├── main.jsx         # エントリーポイント
│   └── index.css        # TailwindCSSの設定
├── public/
│   └── 404.html         # SPA用リダイレクト
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions設定
├── vite.config.js       # Vite設定
├── tailwind.config.js   # TailwindCSS設定
└── postcss.config.js    # PostCSS設定
```

### ビルド

```bash
npm run build
```

ビルドされたファイルは`dist/`ディレクトリに生成されます。

### プレビュー

```bash
npm run preview
```

## 🤝 コントリビューション

プルリクエストを歓迎します！大きな変更の場合は、まずissueを開いて変更内容を議論してください。

## 📄 ライセンス

MIT License

## 👤 作成者

**YOUR_NAME**

- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)

## 🙏 謝辞

- 各ゲームのYaw値情報を提供してくださったコミュニティの皆様
- アイコンライブラリ: [Lucide](https://lucide.dev/)
- フォント: [Google Fonts - Orbitron & Inter](https://fonts.google.com/)

---

⭐ このプロジェクトが役に立ったら、ぜひスターをつけてください！
