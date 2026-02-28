# エピソード: AI時代にBig Techの手書きコーディング面接はまだ必要なのか？

## メタ情報
- 想定尺: 約5分
- 形式: MC（進行役）+ ゲスト（詳しい人）の対話
- ソース: landing.jobsの記事「The new reality of coding interviews in the AI era」を軸に、interviewing.ioの業界調査データ、MetaのAI面接パイロット事例、NC State大学の研究などを交えて構成

---

## 台本

MC: 今回のテーマは「AI時代にBig Techの手書きコーディング面接はまだ必要なのか」です。実務ではCopilotやClaude Codeを毎日使ってるのに、面接ではホワイトボードにペンで二分木を反転しろと。この違和感、多くのエンジニアが感じてると思います。

ゲスト: よろしくお願いします。この話題、landing.jobsが「The new reality of coding interviews in the AI era」という記事でうまく整理していて、結論から言うと「コーディング面接はなくならないけど、今の形のままでは続かない」というのが業界の流れです。

MC: まず現状を確認したいんですが、実際Big Techの面接って今どうなってるんですか？

ゲスト: interviewing.ioが2025年にFAANG企業を中心に67社を調査したデータがあるんですが、驚くことに、FAANG52社の中でアルゴリズム問題をやめた会社はゼロです。つまり、LeetCode的なコーディング面接は依然として標準。ただし81%の面接官が「候補者がAIを使ってるんじゃないか」と疑っていて、実際に33%がカンニングを見つけたと報告しています。

MC: 3人に1人。それはかなり多いですね。

ゲスト: だから企業は2つの方向に分かれてるんです。1つ目は「オフラインに戻す」派。Googleが象徴的で、主要なエンジニアリング拠点でオンサイト面接を復活させるパイロットを終えて、全SWE職に展開する計画を進めています。バーチャル面接2回の後にオフィスで3〜4回面接するスタイル。要は「目の前で書かせれば、AIは使えないでしょ」という発想ですね。

MC: なるほど。もう1つの方向は？

ゲスト: 「AIをむしろ面接に組み込む」派です。Metaが2025年10月から導入したAIアシスト面接がまさにそれで、オンサイトのコーディングラウンド2回のうち1回を、AI使用OKの60分セッションに置き換えたんです。CoderPadという環境でGPT-5やClaude Sonnet、Gemini 2.5 Proなどを自由に使える。

MC: 面接でAIを使っていいって、それだと全員が正解出せてしまうんじゃないですか？

ゲスト: そこがポイントで、問題の形式が全く違うんです。従来の「アルゴリズム1問を45分で解け」ではなく、1000行から2000行のマルチファイルプロジェクトが渡されて、それを拡張したりデバッグしたりする。実務に近い形式です。AIを使えば速くはなるけど、AIの出力が正しいか判断する力、バグを見つけて直す力、設計判断を説明する力が問われる。

MC: 実際に受けた人の感想はどうなんですか？

ゲスト: 面白い報告があって、あるE7レベルの候補者が「練習環境ではClaude Sonnetが完璧に動いたのに、本番の迷路問題では何度もハルシネーションを起こした」と。つまりAIに頼り切ると本番で詰む。逆に、別の候補者は「AIに頼りすぎている」というフィードバックで落ちています。AIがある環境だからこそ、人間の判断力がより鮮明に見えるんです。

MC: なるほど。でも、そもそもなぜ従来の手書き面接が問題なんでしょうか？

ゲスト: landing.jobsの記事は「AIが既存の弱点を露呈させた」と表現しています。ノースカロライナ州立大学とMicrosoftの共同研究が示したのは、ホワイトボード面接はコーディング能力よりもパフォーマンス不安のレベルを測定しているということ。つまり、プレッシャーに強い人が通りやすいだけで、実際の業務能力とは相関が弱い。

MC: 不安の測定。それは耳が痛い。

ゲスト: さらに、実務との乖離が大きい。現実のエンジニアリングではAPIのデバッグ、システム設計、コードレビューが日常業務の大部分を占めますが、従来の面接はそれをほとんど評価しない。ChatGPTやCopilotの登場がこの矛盾を可視化しただけで、問題は元々あったんです。

MC: じゃあ代わりにどんな面接が良いんですか？

ゲスト: landing.jobsは5つの方向性を提示しています。1つ目がプロジェクト型アセスメント。バックエンドならAPIを設計して実装するような、実務を模した課題。2つ目がライブコラボレーション。ペアプログラミング形式で、コードを書く過程の思考を見る。3つ目がシステムデザイン面接。スケーラビリティやトレードオフの議論はAIがまだ苦手な領域です。4つ目がトライアルデイ。1日チームに入って実際のタスクをやる。5つ目が「AI活用力」の評価。AIをどう使いこなすかを見る面接、つまりMetaがやっていることですね。

MC: 実際どの方向に向かうと思いますか？

ゲスト: 短期的にはGoogleのように「オフラインに戻す」企業が多いと思います。interviewing.ioの調査でもFAANG面接官の50%がオンサイト回帰を予想しています。ただ中長期的にはMetaのアプローチが主流になるでしょう。CoderPadは「AIを使うのはチートじゃない、それが仕事だ」という記事を出していて、Metaのエンジニアも「うちの開発者は毎日AIを使ってる。面接だけ使えないのは合理的じゃない」と明言しています。

MC: リスナーが今すぐやるべきことは？

ゲスト: 3つあります。まず、基礎力は引き続き必要です。Metaの面接でも、AIの出力を評価するにはデータ構造とアルゴリズムの理解が前提。「AIがあるから基礎は要らない」は危険です。次に、AIとの協働力を磨くこと。プロンプトの出し方、出力の検証、デバッグの対話、これは意識的に練習しないと身につかない。最後に、システムデザインとコードレビューの力。AIが進化しても、設計判断と品質担保はしばらく人間の仕事です。むしろそこが差別化ポイントになる。

MC: ありがとうございます。まとめると、手書きコーディング面接は消えないけど、「何を測るか」が変わりつつある。暗記力やプレッシャー耐性から、AIとの協働力、システム思考、判断力へ。面接形式の過渡期だからこそ、基礎力とAI活用力の両方を磨いておくのが最善の戦略ですね。今回は「AI時代にBig Techの手書きコーディング面接はまだ必要なのか」をお届けしました。

---

## 参照記事
1. [The new reality of coding interviews in the AI era](https://landing.jobs/blog/the-new-reality-of-coding-interviews-in-the-ai-era/) - Landing.Jobs
2. [How is AI changing interview processes? Not much and a whole lot.](https://interviewing.io/blog/how-is-ai-changing-interview-processes-not-much-and-a-whole-lot) - interviewing.io
3. [How to use AI in Meta's AI-assisted coding interview](https://interviewing.io/blog/how-to-use-ai-in-meta-s-ai-assisted-coding-interview-with-real-prompts-and-examples) - interviewing.io
4. [AI in the interview isn't cheating — it's the job. Just ask Meta.](https://coderpad.io/blog/hiring-developers/ai-in-the-interview-is-not-cheating-it-is-the-job-according-to-meta/) - CoderPad
5. [Whiteboard tests eliminate qualified applicants, research suggests](https://www.ciodive.com/news/technical-interviews-whiteboard-test-bias/581714/) - CIO Dive
