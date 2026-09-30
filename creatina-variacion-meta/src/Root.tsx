import React from 'react';
import {Composition} from 'remotion';
import {DURATION_SEC, FPS} from './config';
import {Main} from './Main';

export const RemotionRoot: React.FC = () => (
  <>
    {/* Reels / Stories / TikTok */}
    <Composition id="CreatinaMeta" component={Main} width={1080} height={1920} fps={FPS} durationInFrames={DURATION_SEC * FPS} defaultProps={{captionBottomPct: 37}} />
    {/* Feed de Facebook/Instagram */}
    <Composition id="CreatinaMeta4x5" component={Main} width={1080} height={1350} fps={FPS} durationInFrames={DURATION_SEC * FPS} defaultProps={{captionBottomPct: 18}} />
  </>
);
