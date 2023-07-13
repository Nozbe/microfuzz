import normalize from '../normalizeText'

describe('normalizeText()', () => {
  it(`normalizes english strings`, () => {
    expect(normalize('abcdef')).toBe('abcdef')
    expect(normalize('   qwerty foo   ')).toBe('qwerty foo')
    expect(normalize('\nfoo\n\t')).toBe('foo')
    expect(normalize('Fo0 BAR')).toBe('fo0 bar')
    expect(normalize(' x ')).toBe('x') // hard space
  })
  it(`removes polish diacritics`, () => {
    expect(normalize('ąśćźżółłńę')).toBe('asczzollne')
    expect(normalize('ĄŚĆŹŻÓŁŃĘ')).toBe('asczzolne')
  })
  it(`removes other latin diacritics`, () => {
    expect(normalize('áéíóúýčďěňřšťžů')).toBe('aeiouycdenrstzu') // Czech
    expect(normalize('ẞäöü')).toBe('ßaou') // German
    expect(normalize('áéíóúüññ')).toBe('aeiouunn') // Spanish
    expect(normalize('Radziu̙̙̙̙̙̙̙̙̙̙̙̙̙̙̙̙͛͛͛͛͛͛͛͛͛͛͛͛ͅ')).toBe('radziu') // zalgo/dbag
  })
  it(`normalizes Russian script`, () => {
    // quirks: Ё->Е, Й->И
    expect(normalize('БВГДЖЗКЛМНПРСТФХЦЧШЩАЕЁИОУЫЭЮЯЙЬЪ')).toBe('бвгджзклмнпрстфхцчшщаееиоуыэюяиьъ')
  })
  it(`does kinda nothing to Chinese, Japanese`, () => {
    expect(normalize('  ラドクリフ、マラソン五輪代表に 1万メートル出場にも含ふくみ  ')).toBe(
      'ラドクリフ、マラソン五輪代表に 1万メートル出場にも含ふくみ',
    )
    expect(normalize(' 日本語 ')).toBe('日本語')
  })
  it(`decomposes Hangul`, () => {
    // looks the same, but the Unicode encoding is different!
    expect(normalize(' 한국어 ')).toBe('한국어')
  })
})
