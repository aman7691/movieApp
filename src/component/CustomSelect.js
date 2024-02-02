import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Select, SelectTrigger, SelectInput, SelectIcon, Icon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectItem } from '@gluestack-ui/themed';
import { ChevronDownIcon } from "@gluestack-ui/themed";

const CustomSelect = ({ category, handleCategoryChange, options, style }) => {
  return (
    <View style={[styles.select, style]}>
      <Select>
        <SelectTrigger variant="outline" size="sm">
          <SelectInput
            placeholder={category}
            style={{ color: 'black', fontSize: 16, paddingVertical: 10 }}
          />
          <SelectIcon mr="$3">
            <Icon as={ChevronDownIcon} />
          </SelectIcon>
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {options.map(option => (
              <SelectItem
                key={option.value}
                label={option.label}
                value={option.value}
                onPress={() => handleCategoryChange(option.value)}
              />
            ))}
          </SelectContent>
        </SelectPortal>
      </Select>
    </View>
  );
};

const styles = StyleSheet.create({
  select: {
    width: "80%",
  },
});

export default CustomSelect;
