export default function SampleDataNotice() {
  return (
    <div className="sample-notice" role="note">
      <strong>⚠ サンプルデータ表示中：</strong>
      現在表示している区域データは、開発用の架空サンプルです。実際の広島県指定の警戒区域とは形状・位置が一致しません。
      本番運用にあたっては、広島県インフラマネジメント基盤 Dobox（
      <a href="https://hiroshima-dobox.jp/datasets/48" target="_blank" rel="noreferrer">土砂災害警戒区域・特別警戒区域情報_広島県</a>
      ）または国土数値情報の公式GeoJSON/シェープファイルへの差し替えが必要です。
    </div>
  )
}
