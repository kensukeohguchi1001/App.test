export default function TrustBar() {
  return (
    <details className="trust-bar">
      <summary className="trust-bar__summary">
        <span>ⓘ</span>
        <span><strong>参考情報です</strong>・表示区域はサンプルデータ</span>
      </summary>
      <div className="trust-bar__body">
        <p>
          本サイトは公式ハザードマップの代替ではありません。正式な確認は広島県砂防課の公式情報
          「<a href="https://www.sabo.pref.hiroshima.lg.jp/" target="_blank" rel="noreferrer">土砂災害ポータルひろしま</a>」
          をご参照ください。
        </p>
        <p>
          現在表示している警戒区域データは、開発用の架空サンプルです。実際の広島県指定の区域とは形状・位置が一致しません。
          本番運用にあたっては、広島県インフラマネジメント基盤 Dobox（
          <a href="https://hiroshima-dobox.jp/datasets/48" target="_blank" rel="noreferrer">土砂災害警戒区域・特別警戒区域情報_広島県</a>
          ）または国土数値情報の公式データへの差し替えが必要です。
        </p>
      </div>
    </details>
  )
}
