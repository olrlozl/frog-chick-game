export type ButtonType = 'modal' | 'mini' | 'middle' | 'long';

export type ButtonColor =
  | 'deepblue'
  | 'skyblue'
  | 'red'
  | 'deepgreen'
  | 'gray'
  | 'yellow'
  | 'green';

export type ButtonLabelKey =
  | 'search'
  | 'apply'
  | 'cancelApply'
  | 'accept'
  | 'reject'
  | 'delete'
  | 'invite';

export interface ButtonInfo {
  label: string;
  color: ButtonColor;
}

export const BUTTON_INFO: Record<ButtonLabelKey, ButtonInfo> = {
  search: { label: '검색', color: 'deepgreen' },
  apply: { label: '친구 신청', color: 'skyblue' },
  cancelApply: { label: '친구 신청 취소', color: 'gray' },
  accept: { label: '친구 수락', color: 'skyblue' },
  reject: { label: '친구 거절', color: 'red' },
  delete: { label: '삭제', color: 'red' },
  invite: { label: '초대', color: 'deepblue' },
};
