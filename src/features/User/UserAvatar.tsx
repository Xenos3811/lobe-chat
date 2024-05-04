'use client';

import { Avatar, type AvatarProps } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { memo } from 'react';

import { DEFAULT_USER_AVATAR_URL } from '@/const/meta';
import { useUserStore } from '@/store/user';
import { userProfileSelectors } from '@/store/user/selectors';

const useStyles = createStyles(({ css, token }) => ({
  clickable: css`
    position: relative;
    transition: all 200ms ease-out 0s;

    &::before {
      content: '';

      position: absolute;
      transform: skewX(-45deg) translateX(-400%);

      overflow: hidden;

      box-sizing: border-box;
      width: 25%;
      height: 100%;

      background: rgba(255, 255, 255, 50%);

      transition: all 200ms ease-out 0s;
    }

    &:hover {
      box-shadow: 0 0 0 2px ${token.colorPrimary};

      &::before {
        transform: skewX(-45deg) translateX(400%);
      }
    }
  `,
}));

export interface UserAvatarProps extends AvatarProps {
  clickable?: boolean;
}

const UserAvatar = memo<UserAvatarProps>(
  ({ size = 40, background, clickable, className, style, ...rest }) => {
    const { styles, cx } = useStyles();
    const avatar = useUserStore(userProfileSelectors.userAvatar);
    return (
      <Avatar
        alt={avatar ? 'UserAvatar' : 'LobeChat'}
        avatar={avatar || DEFAULT_USER_AVATAR_URL}
        background={avatar ? background : undefined}
        className={cx(clickable && styles.clickable, className)}
        size={size}
        style={{ flex: 'none', ...style }}
        unoptimized
        {...rest}
      />
    );
  },
);

UserAvatar.displayName = 'UserAvatar';

export default UserAvatar;
