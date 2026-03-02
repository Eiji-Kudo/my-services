export type Episode = {
  id: string
  number: string
  title: string
  description: string
  longDescription: string
  duration: string
  durationSec: number
  date: string
  tags: string[]
  chapters: { time: string; title: string }[]
}

export const EPISODES: Episode[] = [
  {
    id: 'ep-001',
    number: '001',
    title: 'Claude Code Skills — AIエディタの真の実力',
    description: 'Claude Codeのスキル機能を徹底解説。カスタムスラッシュコマンドからMCPサーバーまで、開発ワークフローを劇的に変えるTipsを紹介します。',
    longDescription: 'Claude Codeのスキル機能を徹底解説します。カスタムスラッシュコマンドの作り方、MCPサーバーとの連携、CLAUDE.mdによるプロジェクト設定、そしてフック機能まで。日々の開発ワークフローを劇的に変えるTipsを実例とともに紹介。AIエディタの可能性を最大限に引き出す方法を探ります。',
    duration: '18:42',
    durationSec: 1122,
    date: '2025-12-15',
    tags: ['Claude Code', 'AI Tools'],
    chapters: [
      { time: '0:00', title: 'オープニング' },
      { time: '1:30', title: 'スキル機能とは' },
      { time: '5:45', title: 'カスタムコマンドの作り方' },
      { time: '10:20', title: 'MCPサーバー連携' },
      { time: '15:00', title: 'CLAUDE.mdの活用' },
      { time: '17:30', title: 'まとめ' },
    ],
  },
  {
    id: 'ep-002',
    number: '002',
    title: 'OpenClaw 実践ガイド — オープンソースAIの新潮流',
    description: 'OpenClawプロジェクトの全貌に迫る。セットアップから実践的な活用法まで、オープンソースAIエコシステムの最前線をお伝えします。',
    longDescription: 'OpenClawプロジェクトの全貌に迫ります。プロジェクトの背景と設計思想から始まり、ローカル環境でのセットアップ手順、実践的なユースケース、コミュニティへの貢献方法まで。オープンソースAIエコシステムの最前線を体験し、自分のプロジェクトに活かす方法を具体的に解説します。',
    duration: '24:15',
    durationSec: 1455,
    date: '2026-01-08',
    tags: ['Open Source', 'AI'],
    chapters: [
      { time: '0:00', title: 'オープニング' },
      { time: '2:00', title: 'OpenClawとは' },
      { time: '7:30', title: 'セットアップ手順' },
      { time: '13:00', title: '実践的な活用法' },
      { time: '19:45', title: 'コミュニティ貢献' },
      { time: '23:00', title: 'まとめ' },
    ],
  },
  {
    id: 'ep-003-1',
    number: '003',
    title: 'Claude Code Remote Control — リモート開発の革命',
    description: 'Claude Codeをリモート環境で使いこなす方法を徹底解説。SSHトンネリングからクラウド統合まで、場所を選ばない開発スタイルを実現します。',
    longDescription: 'Claude Codeをリモート環境で使いこなす方法を徹底解説します。SSHトンネリングの設定方法、クラウドインスタンスとの統合、VS Code Remote SSHとの組み合わせ、そしてセキュリティのベストプラクティスまで。場所を選ばない開発スタイルを実現するための具体的なステップをお伝えします。',
    duration: '21:33',
    durationSec: 1293,
    date: '2026-02-01',
    tags: ['Claude Code', 'Remote Dev'],
    chapters: [
      { time: '0:00', title: 'オープニング' },
      { time: '1:45', title: 'リモート開発の課題' },
      { time: '6:00', title: 'SSHトンネリング設定' },
      { time: '11:30', title: 'クラウド統合' },
      { time: '17:00', title: 'セキュリティ' },
      { time: '20:15', title: 'まとめ' },
    ],
  },
  {
    id: 'ep-003-2',
    number: '003',
    title: 'AI時代のコーディング面接 — 何が変わるのか',
    description: 'AIツールが当たり前になった時代、技術面接はどう変わるべきか。LeetCodeの意味、実践スキルの評価方法、そして新しい面接文化について議論します。',
    longDescription: 'AIツールが当たり前になった時代、技術面接はどう変わるべきでしょうか。LeetCode型の問題にまだ意味はあるのか、実践スキルをどう評価すべきか、ペアプロ面接の可能性、そしてAIネイティブな面接文化とは何か。採用する側・される側の両方の視点から、新しい技術評価のあり方を議論します。',
    duration: '27:08',
    durationSec: 1628,
    date: '2026-02-14',
    tags: ['Career', 'Interview'],
    chapters: [
      { time: '0:00', title: 'オープニング' },
      { time: '3:00', title: 'LeetCodeは必要か' },
      { time: '9:30', title: '実践スキル評価の新手法' },
      { time: '16:00', title: 'ペアプロ面接の可能性' },
      { time: '22:00', title: 'AI時代の面接文化' },
      { time: '26:00', title: 'まとめ' },
    ],
  },
  {
    id: 'ep-003-3',
    number: '003',
    title: 'ロンドンでエンジニアとして働く — YMSビザ完全ガイド',
    description: 'YMSビザでロンドンのテック企業に就職するまでのリアルな体験談。ビザ申請から就活、生活のセットアップまで実体験ベースで解説します。',
    longDescription: 'YMSビザでロンドンのテック企業に就職するまでのリアルな体験談をお届けします。ビザ抽選のタイムライン、申請書類の準備、ロンドンでのテック就活事情、面接対策、給与交渉、そして住居探しから銀行口座開設まで。実体験ベースで、これからYMSを考えている人に向けた完全ガイドです。',
    duration: '31:20',
    durationSec: 1880,
    date: '2026-02-28',
    tags: ['Career', 'London', 'Visa'],
    chapters: [
      { time: '0:00', title: 'オープニング' },
      { time: '2:30', title: 'YMSビザとは' },
      { time: '7:00', title: '申請プロセス' },
      { time: '13:00', title: 'ロンドン就活事情' },
      { time: '20:00', title: '生活セットアップ' },
      { time: '27:00', title: '振り返りとアドバイス' },
      { time: '30:00', title: 'まとめ' },
    ],
  },
]

export function findEpisode(id: string): Episode | undefined {
  return EPISODES.find((ep) => ep.id === id)
}

export function findEpisodeIndex(id: string): number {
  return EPISODES.findIndex((ep) => ep.id === id)
}
