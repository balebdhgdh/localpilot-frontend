import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode, Dispatch, SetStateAction } from 'react'
import { loadState, initialState } from './lib/demo'
import type { DemoState, Page, Content } from './lib/demo'
export const pages:Page[]=['Overview','Content calendar','Content studio','Reviews','Local rankings','Competitors','Business profile','Social accounts','Website & SEO','Citations','Autopilot','Reports','Usage & billing','Settings']
export const slug=(s:string)=>s.toLowerCase().replaceAll(' & ','-').replaceAll(' ','-')
function currentPage(){return pages.find(p=>slug(p)===location.hash.slice(1))??'Overview'}
type Context={state:DemoState;setState:Dispatch<SetStateAction<DemoState>>;page:Page;go:(p:Page)=>void;openContent:(content?:Content)=>void;editing:Content|null;setEditing:Dispatch<SetStateAction<Content|null>>;editorOpen:boolean;setEditorOpen:Dispatch<SetStateAction<boolean>>;log:(value:string)=>void;reset:()=>void}
const AppContext=createContext<Context|null>(null)
export function useApp(){const c=useContext(AppContext);if(!c)throw new Error('App context missing');return c}
export function AppProvider({children}:{children:ReactNode}){
 const [state,setState]=useState(loadState),[page,setPage]=useState<Page>(currentPage),[editing,setEditing]=useState<Content|null>(null),[editorOpen,setEditorOpen]=useState(false)
 useEffect(()=>{try{localStorage.setItem('localpilot-demo-v1',JSON.stringify(state))}catch{console.warn('Local demo storage is unavailable. Changes remain in memory.')}},[state])
 useEffect(()=>{const fn=()=>setPage(currentPage());window.addEventListener('hashchange',fn);return()=>window.removeEventListener('hashchange',fn)},[])
 const go=(p:Page)=>{setPage(p);location.hash=slug(p);window.scrollTo({top:0,behavior:'instant'})}
 const log=(value:string)=>setState(s=>({...s,activities:[value,...s.activities].slice(0,20)}))
 const openContent=(content?:Content)=>{setEditing(content??null);setEditorOpen(true)}
 const reset=()=>{for(const key of ['localpilot-content-policy','localpilot-audit-policy','localpilot-voice'])localStorage.removeItem(key);setState(structuredClone(initialState));go('Overview')}
 return <AppContext.Provider value={{state,setState,page,go,openContent,editing,setEditing,editorOpen,setEditorOpen,log,reset}}>{children}</AppContext.Provider>
}
