import React, { useState } from "react";
import { Formik } from "formik";
import StyledTextInput from "../../components/inputs/StyledTextInput";
import ButtonStyle from "../../components/buttons/ButtonStyle";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { colors } from "./../../components/colors";
import { useDispatch, useSelector } from "react-redux";
import { EditPasswordAction } from "./../../_actions/actions/userActions";
import { styles } from "../../styles/styles";
const { primary } = colors;
import * as Yup from "yup";

const EditPassword = ({ navigation }) => {
  const moveTo = (screen, payLoad) => {
    navigation.navigate(screen, { ...payLoad });
  };
  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;
  const ResetPasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required(
      t("common:Please_enter_your_current_password")
    ),
    newPassword: Yup.string()
      .required(t("common:EnterNouveaumotdepasse"))
      .min(8, t("common:Too_Short"))
      .max(24, t("common:Too_Long"))
      .matches(/(?=.*[0-9])/, t("common:Password_must_contain_a_number"))
      .matches(
        /(?=.*[a-z])/,
        t("common:Password_must_contain_a_lowercase_letter")
      )
      .matches(
        /(?=.*[A-Z])/,
        t("common:Password_must_contain_a_uppercase_letter")
      )
      .matches(
        /(?=.*[!@#$%^&*])/,
        t("common:Password_must_contain_a_special_character")
      ),
    confirmNewPassword: Yup.string()
      .required(t("common:ConfirmPassword"))
      .oneOf([Yup.ref("newPassword"), null], t("common:Passwords_must_match")),
  });
  //message
  const auth = useSelector((state) => state.auth);
  const id = auth.user.id;
  const dispatch = useDispatch();
  const handleOnSubmit = async (values, setSubmitting) => {
    //Call Backend
    dispatch(EditPasswordAction(values, setSubmitting, id, moveTo, t));
  };
  return (
    <View>
      <ScrollView style={styles.container}>
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          validationSchema={ResetPasswordSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleOnSubmit(values, setSubmitting);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isSubmitting,
            errors,
            touched,
          }) => (
            <>
              <StyledTextInput
                language={selectedLanguageCode}
                icon="lock"
                label={t("common:OldPassword")}
                placeholder={t("common:Entrermotdepasse")}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                isPassword={true}
                onChangeText={handleChange("oldPassword")}
                onBlur={handleBlur("oldPassword")}
                value={values.oldPassword}
                style={{ marginBottom: 25 }}
                errors={touched.oldPassword && errors.oldPassword}
              />

              <StyledTextInput
                language={selectedLanguageCode}
                icon="lock"
                label={t("common:NewPassword")}
                placeholder={t("common:EnterNouveaumotdepasse")}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                isPassword={true}
                onChangeText={handleChange("newPassword")}
                onBlur={handleBlur("newPassword")}
                value={values.newPassword}
                style={{ marginBottom: 25 }}
                errors={touched.newPassword && errors.newPassword}
              />

              <StyledTextInput
                language={selectedLanguageCode}
                icon="lock"
                label={t("common:ConfirmNewPassword")}
                placeholder={t("common:ConfirmationduNouveaumotdepasse")}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                isPassword={true}
                onChangeText={handleChange("confirmNewPassword")}
                onBlur={handleBlur("confirmNewPassword")}
                value={values.confirmNewPassword}
                style={{ marginBottom: 25 }}
                errors={touched.confirmNewPassword && errors.confirmNewPassword}
              />

              {!isSubmitting && (
                <ButtonStyle onPress={handleSubmit}>
                  {t("common:Submit")}
                </ButtonStyle>
              )}
              {isSubmitting && (
                <ButtonStyle disabled={true}>
                  <ActivityIndicator
                    size="small"
                    color={primary}
                  ></ActivityIndicator>
                </ButtonStyle>
              )}
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};
export default EditPassword;
