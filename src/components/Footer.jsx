export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p>
          <strong>データ出典：</strong>
          広島県インフラマネジメント基盤 Dobox「土砂災害警戒区域・特別警戒区域情報_広島県」（
          <a href="https://hiroshima-dobox.jp/datasets/48" target="_blank" rel="noreferrer">
            hiroshima-dobox.jp/datasets/48
          </a>
          ）／ 国土数値情報 土砂災害警戒区域データ（国土交通省、
          <a href="https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A33-2016.html" target="_blank" rel="noreferrer">
            nlftp.mlit.go.jp
          </a>
          ）
        </p>
        <p>住所検索：国土地理院 地名検索API（msearch.gsi.go.jp）</p>
        <p>本画面のサンプルデータ最終更新日：2026-08-15（※デモ用の架空データです）</p>
      </div>
    </footer>
  )
}
