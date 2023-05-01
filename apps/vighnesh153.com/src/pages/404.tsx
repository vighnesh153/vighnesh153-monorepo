/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

import React from 'react';
import dynamic from 'next/dynamic';

const Dynamic404Page = dynamic(() => import('@/modules/common/components/404-page'), {
  ssr: false,
});

export default function Page() {
  return <Dynamic404Page />;
}
