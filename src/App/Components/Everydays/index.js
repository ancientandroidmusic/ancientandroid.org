import React, { lazy, Suspense } from 'react';

const ArtworkIcons = lazy(() => import('./ArtworkIcons'))

class Everydays extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {
        return (
            <Suspense fallback={<h1>Still Loading…</h1>}>
                <ArtworkIcons />
            </Suspense>
        )
    }
}

export default Everydays
