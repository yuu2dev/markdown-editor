import _ from 'lodash'
export default {
    updateMarkdown(state, { markdowns, files } = {}) {
        _.mergeWith(
            state,
            {
                markdowns,
                files,
            },
            (a, b) => (b == undefined ? a : b)
        )
    },
}
