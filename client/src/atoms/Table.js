const Table = (props) => {
    const {Head, items, Row, Foot, ...rest} = props;
    return (
        <div className='table-responsive'>
            <table className='table table-sm table-bordered table-striped table-hover'>
                {Head && <thead><tr><Head /></tr></thead>}
                {Row && <tbody>
                    {items && items.map((item,i) => {
                        return (
                            <tr key={i}>
                                <Row item={item} {...rest} />
                            </tr>
                        )
                    })}
                </tbody>}
                {Foot && <tfoot><Foot /></tfoot>}
            </table>
        </div>
    )
}

export default Table