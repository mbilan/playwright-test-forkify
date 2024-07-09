import test from '@playwright/test';
import _ from 'lodash';

export function step(target: Function, context: ClassMethodDecoratorContext) {
  return function replacementMethod(...args: any) {
    const name = _.startCase(context.name as string);
    return test.step(name, async () => {
      return await target.call(this, ...args);
    });
  };
}
