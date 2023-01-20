type covidCases = {
  confirmed : number,
  deceased: number,
  recovered: number,
  tested: number,
  vaccinated1: number,
  vaccinated2: number
}

type date = {
  delta : covidCases,
  delta7 : covidCases,
  total: covidCases
}

type state = {
  [dates : string] : date
}

export type stateResponse = {
  [stateAbbr : string] : state
}

type StateArray = {
  Abbreviation : string,
  State: string
}

export type stateMap = {
  result : {
    Abbreviation : string,
    State: string
  }[]
}
