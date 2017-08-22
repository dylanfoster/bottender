/* @flow */
import warning from 'warning';

import BasicHandlerBuilder, {
  type Predicate,
  type FunctionalHandler,
  type Pattern,
  matchPattern,
} from './BasicHandlerBuilder';

export default class LINEHandlerBuilder extends BasicHandlerBuilder {
  onMessage(predicate: Predicate, handler: FunctionalHandler) {
    this.on(context => context.event.isMessage && predicate(context), handler);
    return this;
  }

  onText(pattern: Pattern, handler: FunctionalHandler) {
    warning(
      typeof pattern === 'string' || pattern instanceof RegExp,
      `'onText' only accepts string or regex, but received ${typeof pattern}`
    );
    this.onMessage(
      context =>
        context.event.isTextMessage &&
        matchPattern(pattern, context.event.message.text),
      handler
    );
    return this;
  }

  onPostback(predicate: Predicate, handler: FunctionalHandler) {
    this.on(context => context.event.isPostback && predicate(context), handler);
    return this;
  }

  onPayload(pattern: Pattern, handler: FunctionalHandler) {
    warning(
      typeof pattern === 'string' || pattern instanceof RegExp,
      `'onPayload' only accepts string or regex, but received ${typeof pattern}`
    );
    this.on(
      context =>
        context.event.isPostback &&
        matchPattern(pattern, context.event.postback.data),
      handler
    );
    return this;
  }

  // account is added as a friend (or unblocked).
  onFollow(handler: FunctionalHandler) {
    this.on(context => context.event.isFollow, handler);
    return this;
  }

  onUnfollow(handler: FunctionalHandler) {
    this.on(context => context.event.isUnfollow, handler);
    return this;
  }

  // account joins a group or talk room.
  onJoin(handler: FunctionalHandler) {
    this.on(context => context.event.isJoin, handler);
    return this;
  }

  // account leaves a group.
  onLeave(handler: FunctionalHandler) {
    this.on(context => context.event.isLeave, handler);
    return this;
  }

  onBeacon(predicate: Predicate, handler: FunctionalHandler) {
    this.on(context => context.event.isBeacon && predicate(context), handler);
    return this;
  }
}
