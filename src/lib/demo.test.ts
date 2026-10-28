import { test } from 'node:test'
import assert from 'node:assert/strict'
import { coverage, canAutoReply, initialState, escapeCsv } from './demo.ts'

test('failed or missing ranking points do not become zero-rank observations',()=>{
 assert.equal(coverage([1,3,7,null,0,NaN]),67)
 assert.equal(coverage([null,0,NaN]),null)
 assert.equal(coverage([12,20]),0)
})
test('a high star rating does not bypass a complaint flag',()=>{
 const praise=initialState.reviews.find(r=>r.id==='r1')!
 const sarcastic=initialState.reviews.find(r=>r.id==='r2')!
 assert.equal(praise.rating,sarcastic.rating)
 assert.equal(canAutoReply(praise),true)
 assert.equal(canAutoReply(sarcastic),false)
 assert.equal(canAutoReply({...praise,rating:2}),false)
 assert.equal(canAutoReply({...praise,status:'Replied'}),false)
})
test('CSV export quotes embedded commas and double quotes',()=>{
 assert.equal(escapeCsv('A, "quoted" business'),'"A, ""quoted"" business"')
})
test('fixture identifiers are unique and scheduled items have a destination and date',()=>{
 const ids=initialState.contents.map(c=>c.id)
 assert.equal(new Set(ids).size,ids.length)
 for(const item of initialState.contents){assert.ok(item.title&&item.body&&item.channel);assert.ok(!Number.isNaN(new Date(item.date).valueOf()))}
 assert.ok(initialState.reviews.filter(r=>r.risk).every(r=>r.status!=='Replied'))
})
