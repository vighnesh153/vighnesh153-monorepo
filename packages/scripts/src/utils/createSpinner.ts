import Spinnies from "spinnies";

const spinnies = new Spinnies();

export type SpinnerOptions = Partial<Spinnies.SpinnerOptions>

export function createSpinner(options: SpinnerOptions) {
  const spinniesIdentifier = `${Math.random()}-${Date.now()}`;
  spinnies.add(spinniesIdentifier, options);
  return {
    succeed: (options: SpinnerOptions) => spinnies.succeed(spinniesIdentifier, options),
    fail: (options: SpinnerOptions) => spinnies.fail(spinniesIdentifier, options)
  };
}
