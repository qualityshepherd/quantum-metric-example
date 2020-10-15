import { ClientFunction } from "testcafe"

// would normally look to remove the clutter from this test...
const qtmSessionIdUndefined = `
(function() {
  var qtm = document.createElement('script')
  qtm.type = 'text/javascript'
  qtm.async = 1
  qtm.src = 'https://cdn.quantummetric.com/instrumentation/quantum-qa1.js'
  var d = document.getElementsByTagName('script')[0]
  !window.QuantumMetricAPI && d.parentNode.insertBefore(qtm, d)
})()

window["QuantumMetricOnload"] = function() {
  var sessionID = QuantumMetricAPI.getSessionID()
  // <VERIFY HERE THAT sessionID IS UNDEFINED>
  window.sessionID = sessionID
}`

fixture `Inject QM Code`
  .page `https://status.cloud.google.com/`

test('sessionID should be undefined', async t => {
  const sessionID = ClientFunction(() => window.sessionID)()

  await t.expect(sessionID).eql(undefined)
}).clientScripts({ content: qtmSessionIdUndefined })


const qtmSessionIdDefined = `
(function() {
  var qtm = document.createElement('script')
  qtm.type = 'text/javascript'
  qtm.async = 1
  qtm.src = 'https://cdn.quantummetric.com/instrumentation/quantum-qa1.js'
  var d = document.getElementsByTagName('script')[0]
  !window.QuantumMetricAPI && d.parentNode.insertBefore(qtm, d)
})()

window["QuantumMetricOnload"] = function() {
  QuantumMetricAPI.addEventListener('start', function() {
    var sessionID = QuantumMetricAPI.getSessionID()
    // <VERIFY HERE THAT sessionID IS DEFINED>
    window.sessionID = sessionID
  })
}
`

test('sessionID should be defined', async t => {
  const sessionID = ClientFunction(() => window.sessionID)()

  await t.expect(sessionID).ok()
}).clientScripts({ content: qtmSessionIdDefined })