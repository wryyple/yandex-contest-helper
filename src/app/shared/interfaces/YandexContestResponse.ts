export interface YandexContestResponse {
  titles: ParticipantResponse[],
  rows: ExerciseResponse[]
}

export interface ParticipantResponse {
  participantInfo: ParticipantInfo,
  placeFrom: number[],
  placeTo: number[],
  problemResults: ProblemResult[],
  score: string
}

export interface ExerciseResponse {
  name: string,
  title: string
}

export interface ParticipantInfo {
  id: number,
  login: string,
  name: string,
  startTime?: number, // UNTESTED
  uid?: number // UNTESTED
}

export interface ProblemResult {
  submitDelay: number,
  status: string,
  score: string,
  submissionCount: string
}
