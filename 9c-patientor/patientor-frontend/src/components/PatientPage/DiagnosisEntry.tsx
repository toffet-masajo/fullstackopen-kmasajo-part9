import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { Diagnosis } from "../../types";
import diagnosisService from "../../services/diagnoses";

interface DiagnosisProps {
  diagnosis: string;
}

const DiagnosisEntry = ({ diagnosis }: DiagnosisProps) => {
  const [value, setValue] = useState<Diagnosis>({ code: "", name: "" });

  useEffect(() => {
    const fetchDiagnosisData = async () => {
      const data = await diagnosisService.getDiagnosis(diagnosis);
      setValue(data);
    };

    void fetchDiagnosisData();
  }, []);

  return (
    <Typography variant="body2">
      {value.code} {value.name}
    </Typography>
  );
};

export default DiagnosisEntry;
