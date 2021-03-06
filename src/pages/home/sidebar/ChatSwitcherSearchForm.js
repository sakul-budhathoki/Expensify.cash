import _ from 'underscore';
import React from 'react';
import {
    TouchableOpacity,
    View,
    Text,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../../styles/styles';
import themeColors from '../../../styles/themes/default';
import TextInputWithFocusStyles from '../../../components/TextInputWithFocusStyles';
import {getDisplayName} from '../../../libs/actions/PersonalDetails';
import PillWithCancelButton from '../../../components/PillWithCancelButton';
import optionPropTypes from './optionPropTypes';

const propTypes = {
    // A ref to forward to the text input
    forwardedRef: PropTypes.func.isRequired,

    // The current value of the search input
    searchValue: PropTypes.string.isRequired,

    // A function to call when the text has changed in the input
    onChangeText: PropTypes.func.isRequired,

    // A function to call when the input has gotten focus
    onFocus: PropTypes.func.isRequired,

    // A function to call when a key has been pressed in the input
    onKeyPress: PropTypes.func.isRequired,

    // Remove selected user from group DM list
    onRemoveFromGroup: PropTypes.func.isRequired,

    // Begins / navigates to the chat between the various group users
    onConfirmUsers: PropTypes.func.isRequired,

    // Users selected to begin a group report DM
    usersToStartGroupReportWith: PropTypes.arrayOf(optionPropTypes),
};

const defaultProps = {
    usersToStartGroupReportWith: [],
};

const ChatSwitcherSearchForm = props => (
    <View style={[styles.flexRow, styles.sidebarHeaderTop]}>
        {props.usersToStartGroupReportWith.length > 0
            ? (
                <View
                    style={[
                        styles.chatSwitcherGroupDMContainer,
                        styles.flex1,
                    ]}
                >
                    <View style={[styles.flexGrow1]}>
                        <View style={styles.chatSwitcherPillsInput}>
                            {_.map(props.usersToStartGroupReportWith, user => (
                                <View
                                    key={user.login}
                                    style={[styles.chatSwticherPillWrapper]}
                                >
                                    <PillWithCancelButton
                                        text={getDisplayName(user.login)}
                                        onCancel={() => props.onRemoveFromGroup(user)}
                                    />
                                </View>
                            ))}
                            <View
                                style={[
                                    styles.chatSwitcherInputGroup,
                                    styles.flexRow,
                                    styles.flexGrow1,
                                    styles.alignSelfStretch,
                                ]}
                            >
                                <TextInputWithFocusStyles
                                    styleFocusIn={[styles.noOutline]}
                                    ref={props.forwardedRef}
                                    style={[styles.chatSwitcherGroupDMTextInput, styles.mb1]}
                                    value={props.searchValue}

                                    // We don't want to handle this blur event when
                                    // we are composing a group DM since it will reset
                                    // everything when we try to remove a user or start
                                    // the conversation
                                    // eslint-disable-next-line react/jsx-props-no-multi-spaces
                                    onChangeText={props.onChangeText}
                                    onFocus={props.onFocus}
                                    onKeyPress={props.onKeyPress}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={[styles.ml1, styles.justifyContentEnd]}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonSmall, styles.buttonSuccess, styles.chatSwitcherGo]}
                            onPress={props.onConfirmUsers}
                            underlayColor={themeColors.componentBG}
                        >
                            <Text
                                style={[
                                    styles.buttonText,
                                    styles.buttonSmallText,
                                    styles.buttonSuccessText,
                                ]}
                            >
                                Go
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
            : (
                <TextInputWithFocusStyles
                    styleFocusIn={[styles.textInputReversedFocus]}
                    ref={props.forwardedRef}
                    style={[styles.textInput, styles.flex1]}
                    value={props.searchValue}
                    onChangeText={props.onChangeText}
                    onFocus={props.onFocus}
                    onKeyPress={props.onKeyPress}
                    placeholder="Find or start a chat"
                    placeholderTextColor={themeColors.textSupporting}
                />
            )}
    </View>
);

ChatSwitcherSearchForm.propTypes = propTypes;
ChatSwitcherSearchForm.defaultProps = defaultProps;
ChatSwitcherSearchForm.displayName = 'ChatSwitcherSearchForm';

export default React.forwardRef((props, ref) => (
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    <ChatSwitcherSearchForm {...props} forwardedRef={ref} />
));
