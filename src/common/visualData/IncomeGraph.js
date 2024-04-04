import React from "react";
import { LinearProgress } from "@mui/material";



function IncomeGraph() {
    const progress = 10 /100 * 100
    return (
        <LinearProgress
            variant="determinate"
            value={progress}
            color={progress < 100 ? 'primary' : 'secondary'}
            sx={{
                height: 10,
                borderRadius: 5
            }}
        />
    )
}










export default IncomeGraph