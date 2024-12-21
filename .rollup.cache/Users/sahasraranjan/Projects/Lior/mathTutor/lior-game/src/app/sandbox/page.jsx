'use client';
import { Suspense } from 'react';
import { LiorGameProvider } from '@/components/lior-game-provider';
import FractionsGame from './game/game';
import { useSandboxContext } from '@/components/sandbox';
export default function Page() {
    var _a;
    return (<Suspense fallback={<div>Loading...</div>}>
      <LiorGameProvider>
        <FractionsGame sendAdminMessage={(_a = useSandboxContext().sendAdminMessage) !== null && _a !== void 0 ? _a : ((role, content) => { })}/>
      </LiorGameProvider>
    </Suspense>);
}
//# sourceMappingURL=page.jsx.map