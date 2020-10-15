import { Selector as $ } from 'testcafe'

fixture `Where's Mario?`
  .page `https://www.quantummetric.com/our-story/`

test('should find Mario', async t => {
  // sadness: obviously we wouldn't normally have selectors in a test... but...
  await t.expect($('#rect-5').exists).ok()
})