import { StageRoutingModule } from './stage-routing.module';

describe('StageRoutingModule', () => {
  let stageRoutingModule: StageRoutingModule;

  beforeEach(() => {
    stageRoutingModule = new StageRoutingModule();
  });

  it('should create an instance', () => {
    expect(stageRoutingModule).toBeTruthy();
  });
});
