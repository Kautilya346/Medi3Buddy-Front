import { useState, useCallback } from "react";
import { getLocalData, setLocalData } from "../utils/helpers";

// Custom hook for managing user role and authentication state
export const useUserRole = () => {
  const [userRole, setUserRoleState] = useState(() => {
    return getLocalData("userRole") || null;
  });

  const setUserRole = useCallback((role) => {
    setUserRoleState(role);
    if (role) {
      setLocalData("userRole", role);
    } else {
      localStorage.removeItem("userRole");
    }
  }, []);

  return [userRole, setUserRole];
};

// Custom hook for managing form state
export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  const setFieldError = useCallback((name, error) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    setValues,
    errors,
    setErrors,
    touched,
    setTouched,
    handleChange,
    handleBlur,
    setFieldError,
    reset,
  };
};

// Custom hook for API calls with loading and error states
export const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  React.useEffect(() => {
    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: fetchData };
};
