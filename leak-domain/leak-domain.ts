enum OnboardingStatus {
  NotStarted = 'NotStarted',
  InProgress = 'InProgress',
  Done = 'Done',
}

type OnboardingStepName = 'readWelcomePage' | 'showFeedPage' | 'showProfilePage' | 'installMobileApp'


class UserId {
  /* user entity */
}

class OnboardingProcess {
  readonly steps: Record<OnboardingStepName, OnboardingStatus> = {
    readWelcomePage: OnboardingStatus.Done,
    showFeedPage: OnboardingStatus.NotStarted,
    showProfilePage: OnboardingStatus.NotStarted,
    installMobileApp: OnboardingStatus.NotStarted,
  }

  readonly #userId: UserId

  private constructor(userId: UserId) {
    this.#userId = userId
  }

  static create(userId: UserId) {
    return new OnboardingProcess(userId)
  }

  startStep(stepName: OnboardingStepName) {
    this.steps[stepName] = OnboardingStatus.InProgress
  }

  finishStep(stepName: OnboardingStepName) {
    this.steps[stepName] = OnboardingStatus.Done
  }
}

// Repository
interface OnboardingProcessRepository {
  findByUserId(userId: UserId): OnboardingProcess
}

// UseCase
class GiveOnboardingRewardUseCase {
  #onboardingProcessRepository: OnboardingProcessRepository

  constructor(onboardingProcessRepository: OnboardingProcessRepository) {
    this.#onboardingProcessRepository = onboardingProcessRepository
  }

  execute(userId: UserId) {
    const onboardingProcess = this.#onboardingProcessRepository.findByUserId(userId)

    // 全てのステップが完了しているかどうかのチェックはドメイン層で行われるべき
    const isAllStepsDone = Object.values(onboardingProcess.steps).every(
      (step) => step === OnboardingStatus.Done
    )

    if (isAllStepsDone) {
      // give reward
    }
  }
}