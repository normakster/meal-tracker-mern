const List = (props) => {
    const { Head, children } = props;
    return (
        <div className='table-responsive'>{/*  border border-info */}
            <table className='table table-sm table-bordered table-striped table-hover'>{/*  table-dark */}
                <thead>
                    <tr><Head /></tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    )
}

export default List;