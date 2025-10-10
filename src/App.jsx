import React, { useState, useEffect } from 'react';
import { Calculator, RefreshCw, Plus, Search, Trash2, X, AlertCircle, Globe } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Google Fontsのインポート
const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');
`;

// スタイルをドキュメントに追加
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = fontStyle;
  document.head.appendChild(styleElement);
}

// ========================================
// Supabase クライアント初期化
// ========================================
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Supabaseクライアント（環境変数が設定されている場合のみ初期化）
const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ========================================
// 多言語対応テキスト
// ========================================
const translations = {
  ja: {
    title: 'SenSync',
    subtitle: 'FPSゲーム間のマウス感度を簡単に同期',
    mouseDpi: 'マウスDPI',
    sourceGame: '元のゲーム',
    targetGame: '変換先のゲーム',
    sourceSens: '元の感度',
    convertedSens: '変換後の感度',
    addCustomGame: 'カスタムゲームを追加',
    swapGames: 'ゲームを入れ替え',
    edpi: 'eDPI',
    edpiDesc: 'DPI × ゲーム内感度',
    cm360: '360度回転距離',
    cm360Desc: 'マウスパッドでの移動距離',
    fovSource: '元のFOV（視野角）',
    fovTarget: '変換先のFOV（視野角）',
    fovAdjustedSens: 'FOV調整後の感度',
    fovAdjustedDesc: 'FOVの違いを考慮した感度',
    optional: '任意',
    howToUse: '使い方',
    howToUseItems: [
      'マウスのDPIを入力してください',
      '現在使用しているゲームと感度を選択してください',
      '変換したいゲームを選択すると、自動的に感度が計算されます',
      'FOV（視野角）を入力すると、視野角の違いを考慮した感度も計算されます',
      'eDPIと360度回転距離も同時に表示されます'
    ],
    customGameTitle: 'カスタムゲームの追加方法',
    customGameItems: [
      '「カスタムゲームを追加」ボタンをクリック',
      'ゲーム名を入力し、「Yaw値を検索する」で情報を検索',
      '見つけたYaw値（感度係数）を入力して追加完了',
      'カスタムゲームはゴミ箱アイコンで削除できます'
    ],
    securityTitle: 'セキュリティについて',
    securityItems: [
      'すべての入力値は安全な範囲内に制限されています',
      '個人情報やデータは一切保存されません（メモリ内のみで動作）',
      '外部サイトへのアクセスは安全に処理されています'
    ],
    modalTitle: 'カスタムゲーム追加',
    gameName: 'ゲーム名',
    maxChars: '最大{max}文字',
    searchYaw: 'Yaw値を検索する',
    yawValue: 'Yaw値（感度係数）',
    yawHint: '検索でYaw値（感度係数）を見つけて、下に入力してください',
    addGame: 'ゲームを追加',
    custom: 'カスタム',
    validationErrors: {
      dpiRequired: 'DPIは数値で入力してください',
      dpiRange: 'DPIは{min}〜{max}の範囲で入力してください',
      sensRequired: '感度は数値で入力してください',
      sensRange: '感度は{min}〜{max}の範囲で入力してください',
      yawRequired: 'Yaw値は数値で入力してください',
      yawRange: 'Yaw値は{min}〜{max}の範囲で入力してください',
      gameNameRequired: 'ゲーム名を入力してください',
      gameNameLength: 'ゲーム名は{max}文字以内で入力してください',
      fovRequired: 'FOVは数値で入力してください',
      fovRange: 'FOVは{min}〜{max}の範囲で入力してください'
    },
    proSettings: 'プロゲーマーの設定',
    proSettingsDesc: 'FPS初心者の方は、プロゲーマーの設定を参考にしてみましょう',
    selectGameToViewPros: 'ゲームを選択してプロの設定を表示',
    player: 'プレイヤー',
    dpi: 'DPI',
    sensitivity: '感度',
    video: '動画',
    noProsAvailable: 'このゲームのプロ設定は現在登録されていません',
    loading: '読み込み中...'
  },
  en: {
    title: 'SenSync',
    subtitle: 'Easily sync mouse sensitivity across FPS games',
    mouseDpi: 'Mouse DPI',
    sourceGame: 'Source Game',
    targetGame: 'Target Game',
    sourceSens: 'Source Sensitivity',
    convertedSens: 'Converted Sensitivity',
    addCustomGame: 'Add Custom Game',
    swapGames: 'Swap Games',
    edpi: 'eDPI',
    edpiDesc: 'DPI × In-game Sensitivity',
    cm360: '360° Distance',
    cm360Desc: 'Mouse pad travel distance',
    fovSource: 'Source FOV',
    fovTarget: 'Target FOV',
    fovAdjustedSens: 'FOV-Adjusted Sensitivity',
    fovAdjustedDesc: 'Sensitivity adjusted for FOV difference',
    optional: 'Optional',
    howToUse: 'How to Use',
    howToUseItems: [
      'Enter your mouse DPI',
      'Select your current game and sensitivity',
      'Select the target game to automatically calculate the converted sensitivity',
      'Enter FOV values to calculate sensitivity adjusted for FOV differences',
      'eDPI and 360° distance are also displayed'
    ],
    customGameTitle: 'How to Add Custom Games',
    customGameItems: [
      'Click the "Add Custom Game" button',
      'Enter the game name and click "Search Yaw Value" to find information',
      'Enter the found Yaw value (sensitivity coefficient) to complete',
      'Custom games can be deleted with the trash icon'
    ],
    securityTitle: 'About Security',
    securityItems: [
      'All input values are restricted to safe ranges',
      'No personal information or data is stored (operates in memory only)',
      'External site access is handled securely'
    ],
    modalTitle: 'Add Custom Game',
    gameName: 'Game Name',
    maxChars: 'Max {max} characters',
    searchYaw: 'Search Yaw Value',
    yawValue: 'Yaw Value (Sensitivity Coefficient)',
    yawHint: 'Find the Yaw value through search and enter it below',
    addGame: 'Add Game',
    custom: 'Custom',
    validationErrors: {
      dpiRequired: 'DPI must be a number',
      dpiRange: 'DPI must be between {min} and {max}',
      sensRequired: 'Sensitivity must be a number',
      sensRange: 'Sensitivity must be between {min} and {max}',
      yawRequired: 'Yaw value must be a number',
      yawRange: 'Yaw value must be between {min} and {max}',
      gameNameRequired: 'Please enter a game name',
      gameNameLength: 'Game name must be within {max} characters',
      fovRequired: 'FOV must be a number',
      fovRange: 'FOV must be between {min} and {max}'
    },
    proSettings: 'Pro Player Settings',
    proSettingsDesc: 'Beginners can reference pro player settings as a starting point',
    selectGameToViewPros: 'Select a game to view pro settings',
    player: 'Player',
    dpi: 'DPI',
    sensitivity: 'Sensitivity',
    video: 'Video',
    noProsAvailable: 'No pro settings registered for this game yet',
    loading: 'Loading...'
  }
};

// ========================================
// テーマ設定 - ここを編集するだけで色が変わります
// ========================================
const theme = {
  background: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
  card: {
    base: 'bg-slate-800/60 backdrop-blur-lg border-slate-700',
    secondary: 'bg-slate-700/40',
  },
  input: {
    base: 'bg-slate-700/80 border-slate-600 text-white placeholder-slate-400 focus:ring-blue-500',
    result: 'bg-slate-700/50 border-slate-600',
    error: 'bg-red-900/30 border-red-500',
  },
  button: {
    primary: 'bg-blue-600 hover:bg-blue-700',
    secondary: 'bg-slate-600 hover:bg-slate-700',
    success: 'bg-green-600 hover:bg-green-700',
    danger: 'bg-red-600 hover:bg-red-700',
  },
  text: {
    primary: 'text-white',
    secondary: 'text-slate-400',
    muted: 'text-slate-500',
    error: 'text-red-400',
  },
  border: 'border-slate-700',
  icon: 'text-slate-400',
};

// ========================================
// セキュリティ設定: 入力値の制限
// ========================================
const SECURITY_LIMITS = {
  DPI_MIN: 100,
  DPI_MAX: 32000,
  YAW_MIN: 0.0001,
  YAW_MAX: 10,
  SENSITIVITY_MIN: 0.001,
  SENSITIVITY_MAX: 100,
  GAME_NAME_MAX_LENGTH: 50,
  FOV_MIN: 60,
  FOV_MAX: 120,
};

// ========================================
// バリデーション関数
// ========================================
const createValidator = (min, max, errorKey, lang, t) => (value) => {
  const num = parseFloat(value);
  if (isNaN(num)) return { 
    valid: false, 
    message: t.validationErrors[`${errorKey}Required`]
  };
  if (num < min || num > max) {
    return { 
      valid: false, 
      message: t.validationErrors[`${errorKey}Range`]
        .replace('{min}', min)
        .replace('{max}', max)
    };
  }
  return { valid: true };
};

const validateGameName = (name, t) => {
  if (!name || name.trim().length === 0) {
    return { valid: false, message: t.validationErrors.gameNameRequired };
  }
  if (name.length > SECURITY_LIMITS.GAME_NAME_MAX_LENGTH) {
    return { 
      valid: false, 
      message: t.validationErrors.gameNameLength.replace('{max}', SECURITY_LIMITS.GAME_NAME_MAX_LENGTH)
    };
  }
  return { valid: true };
};

// ========================================
// デフォルトゲームデータ
// ========================================
const defaultGames = {
  valorant: { name: 'VALORANT', yaw: 0.07, custom: false },
  apex: { name: 'Apex Legends', yaw: 0.022, custom: false },
  csgo: { name: 'CS2 / CS:GO', yaw: 0.022, custom: false },
  overwatch: { name: 'Overwatch 2', yaw: 0.0066, custom: false },
  fortnite: { name: 'Fortnite', yaw: 0.5555, custom: false },
  cod: { name: 'Call of Duty', yaw: 0.0066, custom: false },
  pubg: { name: 'PUBG', yaw: 0.0066, custom: false },
  rainbow6: { name: 'Rainbow Six Siege', yaw: 0.00572958, custom: false }
};

// ========================================
// プロプレイヤー設定データ取得関数
// ========================================
const fetchProPlayerSettings = async () => {
  // Supabaseが利用できない場合は空のオブジェクトを返す
  if (!supabase) {
    console.warn('Supabase is not configured. Pro player settings will not be available.');
    return {};
  }

  try {
    const { data, error } = await supabase
      .from('pro_players')
      .select('*')
      .order('player_name', { ascending: true });

    if (error) throw error;

    // デバッグ：取得したデータを確認
    console.log('Supabaseから取得したデータ:', data);
    console.log('データ件数:', data.length);

    // データをgame_idごとにグループ化
    const groupedData = {};
    data.forEach(player => {
      if (!groupedData[player.game_id]) {
        groupedData[player.game_id] = [];
      }
      groupedData[player.game_id].push({
        name: player.player_name,
        dpi: player.dpi,
        sens: player.sensitivity,
        edpi: player.edpi,
        youtubeUrl: player.youtube_url
      });
    });

    console.log('グループ化されたデータ:', groupedData);
    return groupedData;
  } catch (error) {
    console.error('Error fetching pro player settings:', error);
    return {};
  }
};

// ========================================
// YouTube URL処理ヘルパー関数
// ========================================
const getYouTubeVideoId = (url) => {
  if (!url) return null;

  // 既にIDだけの場合（11文字）
  if (url.length === 11 && !url.includes('/') && !url.includes('?')) {
    return url;
  }

  // フルURLからIDを抽出
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
};

// ========================================
// FOV変換計算
// FOVの違いを考慮した感度調整を行う
// Monitor Distance (モニター距離) 方式を使用
// ========================================
const calculateFOVAdjustedSensitivity = (sourceFov, targetFov, sourceSens) => {
  if (!sourceFov || !targetFov || sourceFov <= 0 || targetFov <= 0) {
    return null;
  }
  
  // モニター距離方式: tan(FOV/2)を使用
  const sourceTan = Math.tan((sourceFov * Math.PI) / 360);
  const targetTan = Math.tan((targetFov * Math.PI) / 360);
  const fovRatio = targetTan / sourceTan;
  
  return sourceSens * fovRatio;
};

// ========================================
// エラーメッセージ表示コンポーネント
// ========================================
const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return (
    <div className="flex items-center gap-2 mt-2 text-sm text-red-400">
      <AlertCircle className="w-4 h-4" />
      <span>{message}</span>
    </div>
  );
};

// ========================================
// 言語切り替えボタン
// ========================================
const LanguageToggle = ({ currentLang, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-4 py-2 ${theme.button.secondary} ${theme.text.primary} rounded-lg transition-colors`}
      title={currentLang === 'ja' ? 'Switch to English' : '日本語に切り替え'}
    >
      <Globe className="w-5 h-5" />
      <span className="font-semibold">{currentLang === 'ja' ? 'EN' : 'JA'}</span>
    </button>
  );
};

// ========================================
// カスタムゲーム追加モーダル
// ========================================
const AddCustomGameModal = ({ isOpen, onClose, onAdd, lang }) => {
  const t = translations[lang];
  const [gameName, setGameName] = useState('');
  const [yawValue, setYawValue] = useState('');
  const [errors, setErrors] = useState({ gameName: '', yawValue: '' });

  const handleSearch = () => {
    const validation = validateGameName(gameName, t);
    if (!validation.valid) {
      setErrors(prev => ({ ...prev, gameName: validation.message }));
      return;
    }
    
    const searchQuery = `${gameName.trim()} mouse sensitivity yaw value`;
    window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
  };

  const handleAdd = () => {
    const validateYaw = createValidator(SECURITY_LIMITS.YAW_MIN, SECURITY_LIMITS.YAW_MAX, 'yaw', lang, t);
    const nameValidation = validateGameName(gameName, t);
    const yawValidation = validateYaw(yawValue);
    
    if (!nameValidation.valid || !yawValidation.valid) {
      setErrors({
        gameName: nameValidation.valid ? '' : nameValidation.message,
        yawValue: yawValidation.valid ? '' : yawValidation.message
      });
      return;
    }
    
    onAdd(gameName.trim(), parseFloat(yawValue));
    setGameName('');
    setYawValue('');
    setErrors({ gameName: '', yawValue: '' });
    onClose();
  };

  const handleClose = () => {
    setGameName('');
    setYawValue('');
    setErrors({ gameName: '', yawValue: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`${theme.card.base} rounded-2xl p-6 max-w-md w-full border shadow-2xl`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${theme.text.primary}`}>
            {t.modalTitle}
          </h2>
          <button onClick={handleClose} className={`${theme.text.secondary} hover:${theme.text.primary}`}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className={`block ${theme.text.primary} text-sm font-semibold mb-2`}>
              {t.gameName} <span className={theme.text.muted}>({t.maxChars.replace('{max}', SECURITY_LIMITS.GAME_NAME_MAX_LENGTH)})</span>
            </label>
            <input
              type="text"
              value={gameName}
              onChange={(e) => {
                setGameName(e.target.value);
                setErrors(prev => ({ ...prev, gameName: '' }));
              }}
              maxLength={SECURITY_LIMITS.GAME_NAME_MAX_LENGTH}
              placeholder="Minecraft"
              className={`w-full px-4 py-3 ${errors.gameName ? theme.input.error : theme.input.base} border rounded-lg focus:outline-none focus:ring-2`}
            />
            <ErrorMessage message={errors.gameName} />
          </div>

          <button
            onClick={handleSearch}
            disabled={!gameName.trim()}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 ${theme.button.secondary} ${theme.text.primary} rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Search className="w-5 h-5" />
            {t.searchYaw}
          </button>

          <div className={`${theme.card.secondary} rounded-lg p-3`}>
            <p className={`text-xs ${theme.text.secondary}`}>
              💡 {t.yawHint}
            </p>
          </div>

          <div>
            <label className={`block ${theme.text.primary} text-sm font-semibold mb-2`}>
              {t.yawValue} <span className={theme.text.muted}>({SECURITY_LIMITS.YAW_MIN}〜{SECURITY_LIMITS.YAW_MAX})</span>
            </label>
            <input
              type="number"
              step="0.00001"
              value={yawValue}
              onChange={(e) => {
                setYawValue(e.target.value);
                setErrors(prev => ({ ...prev, yawValue: '' }));
              }}
              placeholder="0.022"
              className={`w-full px-4 py-3 ${errors.yawValue ? theme.input.error : theme.input.base} border rounded-lg focus:outline-none focus:ring-2`}
            />
            <ErrorMessage message={errors.yawValue} />
          </div>

          <button
            onClick={handleAdd}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 ${theme.button.success} ${theme.text.primary} rounded-lg transition-colors`}
          >
            <Plus className="w-5 h-5" />
            {t.addGame}
          </button>
        </div>
      </div>
    </div>
  );
};

// ========================================
// ゲーム選択コンポーネント
// ========================================
const GameSelector = ({ label, value, onChange, sublabel, sensValue, onSensChange, showResult, resultValue, games, onDeleteGame, error, lang }) => {
  const t = translations[lang];
  return (
    <div>
      <label className={`block ${theme.text.primary} text-lg font-semibold mb-3`}>
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 ${theme.input.base} border rounded-lg focus:outline-none focus:ring-2 appearance-none`}
        >
          {Object.entries(games).map(([key, game]) => (
            <option key={key} value={key} className="bg-slate-800">
              {game.name} {game.custom ? `(${t.custom})` : ''}
            </option>
          ))}
        </select>
        {games[value]?.custom && onDeleteGame && (
          <button
            onClick={() => onDeleteGame(value)}
            className={`absolute right-12 top-1/2 -translate-y-1/2 ${theme.text.secondary} hover:text-red-500`}
            title="Delete"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>
      
      <label className={`block ${theme.text.primary} text-sm font-medium mt-4 mb-2`}>
        {sublabel} {!showResult && <span className={theme.text.muted}>({SECURITY_LIMITS.SENSITIVITY_MIN}〜{SECURITY_LIMITS.SENSITIVITY_MAX})</span>}
      </label>
      {showResult ? (
        <div className={`px-4 py-3 ${theme.input.result} border rounded-lg`}>
          <span className={`text-2xl font-bold ${theme.text.primary}`}>{resultValue}</span>
        </div>
      ) : (
        <>
          <input
            type="number"
            step="0.01"
            value={sensValue}
            onChange={onSensChange}
            placeholder="0.5"
            className={`w-full px-4 py-3 ${error ? theme.input.error : theme.input.base} border rounded-lg focus:outline-none focus:ring-2`}
          />
          <ErrorMessage message={error} />
        </>
      )}
    </div>
  );
};

// ========================================
// 結果カードコンポーネント
// ========================================
const ResultCard = ({ title, value, unit, description }) => {
  return (
    <div className={`${theme.card.secondary} rounded-xl p-6`}>
      <h3 className={`${theme.text.secondary} text-sm font-semibold mb-2`}>
        {title}
      </h3>
      <p className={`text-3xl font-bold ${theme.text.primary}`}>
        {value} {unit && <span className="text-xl">{unit}</span>}
      </p>
      <p className={`${theme.text.muted} text-sm mt-2`}>
        {description}
      </p>
    </div>
  );
};

// ========================================
// プロプレイヤー設定表示コンポーネント
// ========================================
const ProPlayerSettings = ({ selectedGame, lang, proSettings, isLoading }) => {
  const t = translations[lang];
  const gamePros = proSettings[selectedGame] || [];

  if (isLoading) {
    return (
      <div className={`${theme.card.base} backdrop-blur-lg rounded-2xl p-8 border`}>
        <h3 className={`${theme.text.primary} text-2xl font-bold mb-4`}>
          🎮 {t.proSettings}
        </h3>
        <p className={`${theme.text.secondary} text-center py-8`}>
          {t.loading}
        </p>
      </div>
    );
  }

  if (gamePros.length === 0) {
    return (
      <div className={`${theme.card.base} backdrop-blur-lg rounded-2xl p-8 border`}>
        <h3 className={`${theme.text.primary} text-2xl font-bold mb-4`}>
          🎮 {t.proSettings}
        </h3>
        <p className={`${theme.text.secondary} text-center py-8`}>
          {t.noProsAvailable}
        </p>
      </div>
    );
  }

  return (
    <div className={`${theme.card.base} backdrop-blur-lg rounded-2xl p-8 border`}>
      <h3 className={`${theme.text.primary} text-2xl font-bold mb-2`}>
        🎮 {t.proSettings}
      </h3>
      <p className={`${theme.text.secondary} text-sm mb-6`}>
        {t.proSettingsDesc}
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`border-b ${theme.border}`}>
              <th className={`${theme.text.primary} text-left py-3 px-4 font-semibold`}>
                {t.player}
              </th>
              <th className={`${theme.text.primary} text-right py-3 px-4 font-semibold`}>
                {t.dpi}
              </th>
              <th className={`${theme.text.primary} text-right py-3 px-4 font-semibold`}>
                {t.sensitivity}
              </th>
              <th className={`${theme.text.primary} text-right py-3 px-4 font-semibold`}>
                {t.edpi}
              </th>
              <th className={`${theme.text.primary} text-center py-3 px-4 font-semibold`}>
                {t.video}
              </th>
            </tr>
          </thead>
          <tbody>
            {gamePros.map((pro, index) => {
              const videoId = getYouTubeVideoId(pro.youtubeUrl);
              return (
                <tr
                  key={index}
                  className={`border-b ${theme.border} hover:${theme.card.secondary} transition-colors`}
                >
                  <td className={`${theme.text.primary} py-3 px-4 font-medium`}>
                    {pro.name}
                  </td>
                  <td className={`${theme.text.secondary} text-right py-3 px-4`}>
                    {pro.dpi}
                  </td>
                  <td className={`${theme.text.secondary} text-right py-3 px-4`}>
                    {pro.sens}
                  </td>
                  <td className={`${theme.text.primary} text-right py-3 px-4 font-semibold`}>
                    {pro.edpi}
                  </td>
                  <td className={`py-3 px-4`}>
                    {videoId ? (
                      <div className="flex justify-center">
                        <iframe
                          width="280"
                          height="158"
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title={`${pro.name} gameplay`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="rounded-lg"
                        ></iframe>
                      </div>
                    ) : (
                      <span className={`${theme.text.muted} text-sm`}>-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ========================================
// メインコンポーネント
// ========================================
const FPSSensitivityCalculator = () => {
  const [lang, setLang] = useState('ja');
  const t = translations[lang];

  const [games, setGames] = useState(defaultGames);
  const [dpi, setDpi] = useState(800);
  const [sourceGame, setSourceGame] = useState('valorant');
  const [sourceSens, setSourceSens] = useState(0.5);
  const [targetGame, setTargetGame] = useState('apex');
  const [sourceFov, setSourceFov] = useState('');
  const [targetFov, setTargetFov] = useState('');
  const [cm360, setCm360] = useState(0);
  const [edpi, setEdpi] = useState(0);
  const [convertedSens, setConvertedSens] = useState(0);
  const [fovAdjustedSens, setFovAdjustedSens] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // プロプレイヤー設定の状態管理
  const [proPlayerSettings, setProPlayerSettings] = useState({});
  const [isLoadingProSettings, setIsLoadingProSettings] = useState(true);

  const [errors, setErrors] = useState({
    dpi: '',
    sourceSens: '',
    sourceFov: '',
    targetFov: ''
  });

  const validateDPI = createValidator(SECURITY_LIMITS.DPI_MIN, SECURITY_LIMITS.DPI_MAX, 'dpi', lang, t);
  const validateSensitivity = createValidator(SECURITY_LIMITS.SENSITIVITY_MIN, SECURITY_LIMITS.SENSITIVITY_MAX, 'sens', lang, t);
  const validateFOV = createValidator(SECURITY_LIMITS.FOV_MIN, SECURITY_LIMITS.FOV_MAX, 'fov', lang, t);

  // プロプレイヤー設定をSupabaseから取得
  useEffect(() => {
    const loadProSettings = async () => {
      setIsLoadingProSettings(true);
      const settings = await fetchProPlayerSettings();
      setProPlayerSettings(settings);
      setIsLoadingProSettings(false);
    };

    loadProSettings();
  }, []);

  useEffect(() => {
    const dpiValidation = validateDPI(dpi);
    const sensValidation = validateSensitivity(sourceSens);

    if (dpiValidation.valid && sensValidation.valid) {
      calculateAll();
    }
  }, [dpi, sourceGame, sourceSens, targetGame, games, sourceFov, targetFov, lang]);

  const calculateAll = () => {
    const sourceYaw = games[sourceGame]?.yaw || 0.022;
    const targetYaw = games[targetGame]?.yaw || 0.022;
    
    const validDpi = Math.max(SECURITY_LIMITS.DPI_MIN, Math.min(SECURITY_LIMITS.DPI_MAX, dpi));
    const validSens = Math.max(SECURITY_LIMITS.SENSITIVITY_MIN, Math.min(SECURITY_LIMITS.SENSITIVITY_MAX, sourceSens));
    
    const calculatedEdpi = validDpi * validSens;
    setEdpi(calculatedEdpi.toFixed(2));
    
    const calculatedCm360 = (360 / (validSens * validDpi * sourceYaw)) * 2.54;
    setCm360(calculatedCm360.toFixed(2));
    
    const newSens = (validSens * sourceYaw) / targetYaw;
    setConvertedSens(newSens.toFixed(4));
    
    // FOV調整後の感度を計算
    if (sourceFov && targetFov) {
      const fovAdjusted = calculateFOVAdjustedSensitivity(parseFloat(sourceFov), parseFloat(targetFov), newSens);
      setFovAdjustedSens(fovAdjusted ? fovAdjusted.toFixed(4) : null);
    } else {
      setFovAdjustedSens(null);
    }
  };

  const handleDpiChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setDpi(value);
    const validation = validateDPI(value);
    setErrors(prev => ({ ...prev, dpi: validation.valid ? '' : validation.message }));
  };

  const handleSensChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setSourceSens(value);
    const validation = validateSensitivity(value);
    setErrors(prev => ({ ...prev, sourceSens: validation.valid ? '' : validation.message }));
  };

  const handleSourceFovChange = (e) => {
    const value = e.target.value;
    setSourceFov(value);
    if (value) {
      const validation = validateFOV(value);
      setErrors(prev => ({ ...prev, sourceFov: validation.valid ? '' : validation.message }));
    } else {
      setErrors(prev => ({ ...prev, sourceFov: '' }));
    }
  };

  const handleTargetFovChange = (e) => {
    const value = e.target.value;
    setTargetFov(value);
    if (value) {
      const validation = validateFOV(value);
      setErrors(prev => ({ ...prev, targetFov: validation.valid ? '' : validation.message }));
    } else {
      setErrors(prev => ({ ...prev, targetFov: '' }));
    }
  };

  const swapGames = () => {
    setSourceGame(targetGame);
    setTargetGame(sourceGame);
    setSourceSens(parseFloat(convertedSens));
    
    // FOVも入れ替え
    const tempFov = sourceFov;
    setSourceFov(targetFov);
    setTargetFov(tempFov);
  };

  const addCustomGame = (name, yaw) => {
    const gameId = `custom_${Date.now()}`;
    setGames(prev => ({
      ...prev,
      [gameId]: { name, yaw, custom: true }
    }));
  };

  const deleteCustomGame = (gameId) => {
    if (games[gameId]?.custom) {
      const newGames = { ...games };
      delete newGames[gameId];
      setGames(newGames);
      
      if (sourceGame === gameId) setSourceGame('valorant');
      if (targetGame === gameId) setTargetGame('apex');
    }
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'ja' ? 'en' : 'ja');
  };

  return (
    <div className={`min-h-screen ${theme.background} p-8`} style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-4xl mx-auto">
        {/* 言語切り替えボタン */}
        <div className="flex justify-end mb-4">
          <LanguageToggle currentLang={lang} onToggle={toggleLanguage} />
        </div>

        {/* ヘッダー */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className={`w-10 h-10 ${theme.icon}`} />
            <h1 
              className={`text-6xl font-black ${theme.text.primary}`}
              style={{ 
                fontFamily: 'Orbitron, sans-serif',
                letterSpacing: '0.05em',
                textShadow: '0 0 30px rgba(59, 130, 246, 0.3)'
              }}
            >
              {t.title}
            </h1>
          </div>
          <p className={`${theme.text.secondary} text-lg`}>
            {t.subtitle}
          </p>
        </div>

        {/* メインカード */}
        <div className={`${theme.card.base} rounded-2xl p-8 shadow-2xl border`}>
          {/* DPI入力 */}
          <div className="mb-8">
            <label className={`block ${theme.text.primary} text-lg font-semibold mb-3`}>
              {t.mouseDpi} <span className={theme.text.muted}>({SECURITY_LIMITS.DPI_MIN}〜{SECURITY_LIMITS.DPI_MAX})</span>
            </label>
            <input
              type="number"
              value={dpi}
              onChange={handleDpiChange}
              placeholder="800"
              className={`w-full px-4 py-3 ${errors.dpi ? theme.input.error : theme.input.base} border rounded-lg focus:outline-none focus:ring-2`}
            />
            <ErrorMessage message={errors.dpi} />
          </div>

          {/* ゲーム選択グリッド */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <GameSelector
              label={t.sourceGame}
              value={sourceGame}
              onChange={(e) => setSourceGame(e.target.value)}
              sublabel={t.sourceSens}
              sensValue={sourceSens}
              onSensChange={handleSensChange}
              showResult={false}
              games={games}
              onDeleteGame={deleteCustomGame}
              error={errors.sourceSens}
              lang={lang}
            />

            <GameSelector
              label={t.targetGame}
              value={targetGame}
              onChange={(e) => setTargetGame(e.target.value)}
              sublabel={t.convertedSens}
              showResult={true}
              resultValue={convertedSens}
              games={games}
              onDeleteGame={deleteCustomGame}
              lang={lang}
            />
          </div>

          {/* FOV入力 */}
          <div className={`mb-6 ${theme.card.secondary} rounded-xl p-6`}>
            <h3 className={`${theme.text.primary} text-lg font-semibold mb-4`}>
              FOV {t.optional && <span className={theme.text.muted}>({t.optional})</span>}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={`block ${theme.text.primary} text-sm font-medium mb-2`}>
                  {t.fovSource} <span className={theme.text.muted}>({SECURITY_LIMITS.FOV_MIN}〜{SECURITY_LIMITS.FOV_MAX})</span>
                </label>
                <input
                  type="number"
                  value={sourceFov}
                  onChange={handleSourceFovChange}
                  placeholder="90"
                  className={`w-full px-4 py-3 ${errors.sourceFov ? theme.input.error : theme.input.base} border rounded-lg focus:outline-none focus:ring-2`}
                />
                <ErrorMessage message={errors.sourceFov} />
              </div>
              <div>
                <label className={`block ${theme.text.primary} text-sm font-medium mb-2`}>
                  {t.fovTarget} <span className={theme.text.muted}>({SECURITY_LIMITS.FOV_MIN}〜{SECURITY_LIMITS.FOV_MAX})</span>
                </label>
                <input
                  type="number"
                  value={targetFov}
                  onChange={handleTargetFovChange}
                  placeholder="103"
                  className={`w-full px-4 py-3 ${errors.targetFov ? theme.input.error : theme.input.base} border rounded-lg focus:outline-none focus:ring-2`}
                />
                <ErrorMessage message={errors.targetFov} />
              </div>
            </div>
          </div>

          {/* カスタムゲーム追加ボタン */}
          <div className="mb-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 ${theme.button.secondary} ${theme.text.primary} rounded-lg transition-colors border ${theme.border}`}
            >
              <Plus className="w-5 h-5" />
              {t.addCustomGame}
            </button>
          </div>

          {/* ゲーム入れ替えボタン */}
          <div className="flex justify-center mb-8">
            <button
              onClick={swapGames}
              className={`flex items-center gap-2 px-6 py-3 ${theme.button.primary} ${theme.text.primary} rounded-lg transition-colors shadow-lg`}
            >
              <RefreshCw className="w-5 h-5" />
              {t.swapGames}
            </button>
          </div>

          {/* 結果表示グリッド */}
          <div className={`grid md:grid-cols-${fovAdjustedSens ? '3' : '2'} gap-6 pt-6 border-t ${theme.border}`}>
            <ResultCard
              title={t.edpi}
              value={edpi}
              description={t.edpiDesc}
            />
            <ResultCard
              title={t.cm360}
              value={cm360}
              unit="cm"
              description={t.cm360Desc}
            />
            {fovAdjustedSens && (
              <ResultCard
                title={t.fovAdjustedSens}
                value={fovAdjustedSens}
                description={t.fovAdjustedDesc}
              />
            )}
          </div>
        </div>

        {/* 使い方セクション */}
        <div className={`mt-8 ${theme.card.base} backdrop-blur-lg rounded-xl p-6 border`}>
          <h3 className={`${theme.text.primary} text-lg font-semibold mb-3`}>
            {t.howToUse}
          </h3>
          <ul className={`${theme.text.secondary} space-y-2 text-sm`}>
            {t.howToUseItems.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
            <li className="pt-2 font-semibold">【{t.customGameTitle}】</li>
            {t.customGameItems.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>

        {/* セキュリティ情報 */}
        <div className={`mt-4 ${theme.card.base} backdrop-blur-lg rounded-xl p-6 border`}>
          <h3 className={`${theme.text.primary} text-lg font-semibold mb-3`}>
            🔒 {t.securityTitle}
          </h3>
          <ul className={`${theme.text.secondary} space-y-2 text-sm`}>
            {t.securityItems.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>

        {/* プロプレイヤー設定 */}
        <div className="mt-8">
          <ProPlayerSettings
            selectedGame={sourceGame}
            lang={lang}
            proSettings={proPlayerSettings}
            isLoading={isLoadingProSettings}
          />
        </div>
      </div>

      {/* カスタムゲーム追加モーダル */}
      <AddCustomGameModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addCustomGame}
        lang={lang}
      />
    </div>
  );
};

export default FPSSensitivityCalculator;