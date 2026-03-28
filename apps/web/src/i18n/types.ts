// 国际化类型声明
import zh from '@/messages/zh.json';

type Messages = typeof zh;

declare global {
  // next-intl augments this interface via declaration merging.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends Messages {}
}
